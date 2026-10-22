import { useEffect, useRef, useState } from "react";
import Input from "../Input/Input";
import Select from "../Select/Select";
import Chevron from "../../icons/chevron/chevron";
import IconButton from "../IconButton/IconButton";

const getLitteralMonth = (integerMonth) => {
  const date = new Date(2026, integerMonth, 0);
  return new Intl.DateTimeFormat("fr-FR", {
    month: "long",
  }).format(new Date(date));
};

const formatDate = (year, month, day) => {
  let formatedDate = {
    year,
    month,
    day,
  };

  if (day < 10) {
    formatedDate.day = `0${day}`;
  }
  if (month < 10) {
    formatedDate.month = `0${month}`;
  }

  return Object.values(formatedDate).join("-");
};

function DatePicker({ labelProps, label, onChange, ...props }) {
  const [open, setOpen] = useState();

  const togglePicker = () => {
    setOpen(!open);
  };
  const currentDay = new Date();
  const currentDayNumber = currentDay.getDate();
  const currentMonth = currentDay.getMonth() + 1; // 1 à 12 comme le reste du composant
  const currentYear = currentDay.getFullYear();
  const allMonth = Array.from({ length: 12 }).map((lap, i) => {
    const month = getLitteralMonth(i + 1);
    return {
      label: month,
      value: i + 1,
    };
  });

  const years = Array.from({ length: 200 }).map((_, i) => {
    const year = 1900 + i;
    return {
      label: year,
      value: year,
    };
  });

  // Mois/année affichés dans le calendrier (navigation)
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  // Date choisie : null tant que l'utilisateur n'a pas cliqué sur un jour
  const [selected, setSelected] = useState(null);

  const days = new Date(year, month, 0).getDate();
  const daysStr = [
    {
      value: "lundi",
      label: "L",
    },
    {
      value: "mardi",
      label: "M",
    },
    {
      value: "mercredi",
      label: "M",
    },
    {
      value: "jeudi",
      label: "J",
    },
    {
      value: "vendredi",
      label: "V",
    },
    {
      value: "samedi",
      label: "S",
    },
    {
      value: "dimanche",
      label: "D",
    },
  ];

  const value = selected
    ? formatDate(selected.year, selected.month, selected.day)
    : "";

  const selectDay = (day) => {
    setSelected({ year, month, day });
    onChange &&
      onChange({
        target: {
          name: props?.name ?? "",
          value: formatDate(year, month, day),
        },
      });
  };

  const monthStartDay = new Date(year, month - 1, 1).toLocaleDateString(
    "fr-FR",
    {
      weekday: "long",
    },
  );

  const calOffset = daysStr.findIndex((d) => d.value === monthStartDay);

  const containerRef = useRef(null);

  useEffect(() => {
    if (!open) return; // pas besoin d'écouter quand le menu est fermé

    const handleClickOutside = (event) => {
      if (!containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);
    return () =>
      document.removeEventListener("pointerdown", handleClickOutside);
  }, [open]);

  return (
    <div className="relative d-flex flex-column" ref={containerRef}>
      <label {...labelProps} className={`mb-1 ${labelProps?.className}`}>
        {label}
      </label>

      <Input
        type="date"
        value={value}
        onClick={(e) => {
          e.preventDefault();
          togglePicker(e);
        }}
        onChange={(e) => {
          e.preventDefault();
        }}
      />

      {open && (
        <div
          className="absolute"
          style={{
            top: "100%",
            left: 0,
            right: 0,
            zIndex: 1,
            isolation: "isolate",
            backgroundColor: "var(--light)",
            border: "1px solid var(--border)",
          }}
        >
          <div className="d-flex justify-space-between p-1">
            <div className="d-flex">
              <Select
                options={allMonth}
                value={month}
                onChange={(e) => {
                  setMonth(e);
                  setSelected((prev) => {
                    return prev
                      ? { ...prev, month: e }
                      : {
                          day: currentDayNumber,
                          month: e,
                          year,
                        };
                  });
                }}
                style={{
                  minWidth: "122px",
                }}
              />
              <Select
                options={years}
                value={year}
                onChange={(e) => {
                  setYear(e);
                  setSelected((prev) => {
                    return prev
                      ? { ...prev, year: e }
                      : {
                          day: currentDayNumber,
                          month,
                          year: e,
                        };
                  });
                }}
              />
            </div>
            <div className="d-flex">
              <IconButton
                type="button"
                onClick={() => {
                  const prevMonth = month - 1;
                  if (prevMonth < 1) {
                    setMonth(12);
                    setYear(year - 1);
                  } else setMonth(prevMonth);
                }}
              >
                <Chevron className={"rotate-270"} />
              </IconButton>
              <IconButton
                type="button"
                onClick={() => {
                  const nextMonth = month + 1;
                  if (nextMonth > 12) {
                    setMonth(1);
                    setYear(year + 1);
                  } else setMonth(nextMonth);
                }}
              >
                <Chevron className={"rotate-90"} />
              </IconButton>
            </div>
          </div>
          <div
            className="p-1"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7,1fr)",
            }}
          >
            {daysStr.map((str, i) => (
              <IconButton
                variant={"contained"}
                key={i}
                style={{
                  borderRadius: 0,
                }}
                disabled
              >
                {str.label}
              </IconButton>
            ))}
            {Array.from({ length: calOffset }).map((_, i) => (
              <IconButton
                variant={"outlined"}
                key={i}
                style={{
                  borderRadius: 0,
                }}
                disabled
              ></IconButton>
            ))}
            {Array.from({ length: days }).map((_, i) => (
              <IconButton
                variant={
                  (selected?.day || currentDayNumber) === i + 1
                    ? "contained"
                    : `outlined`
                }
                key={i}
                style={{
                  borderRadius: 0,
                }}
                onClick={() => selectDay(i + 1)}
              >
                {i + 1}
              </IconButton>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DatePicker;
