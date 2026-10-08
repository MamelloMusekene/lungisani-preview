document.addEventListener("DOMContentLoaded", () => {

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth();

    const MIN_YEAR = 2026;
    const MAX_YEAR = 2027;


    /* =====================================================
       CONFIRMED LUNGISANI SCHOOL EVENTS
    ===================================================== */

    const schoolEvents = [
        {
            date: "2026-10-31",
            title: "Hope on the Lawn",
            summary: "Family Walk, Braai & Picnic",
            category: "School Event · Family Day",
            time: "07:00",
            location: "Lungisani Primary School",
            description:
                "A family walk, braai and picnic bringing the Lungisani Primary School community together.",
            ticket:
                "Tickets are available through Webtickets.",
            linkText:
                "Click to view tickets on Webtickets",
            linkUrl:
                "https://www.webtickets.co.za/"
        }
    ];


    /* =====================================================
       IMPORTANT DATES
    ===================================================== */

    const importantDates = {

        "2026-10-06": {
            title: "Term 4 Begins",
            description: "The fourth school term begins today.",
            type: "term-start"
        },

        "2026-12-11": {
            title: "School Closes",
            description:
                "The 2026 school year ends today. Learners begin the December school holiday.",
            type: "school-close"
        },

        "2027-01-13": {
            title: "School Opens",
            description:
                "The 2027 school year begins for learners today.",
            type: "school-open"
        },

        "2027-04-26": {
            title: "Special School Holiday",
            description:
                "There is no school today. This is a special school holiday.",
            type: "school-holiday"
        }
    };


    /* =====================================================
       SCHOOL TERMS
    ===================================================== */

    const schoolTerms = {

        2026: [
            {
                name: "Term 1",
                start: "2026-01-14",
                end: "2026-03-27"
            },
            {
                name: "Term 2",
                start: "2026-04-08",
                end: "2026-06-26"
            },
            {
                name: "Term 3",
                start: "2026-07-21",
                end: "2026-09-23"
            },
            {
                name: "Term 4",
                start: "2026-10-06",
                end: "2026-12-11"
            }
        ],

        2027: [
            {
                name: "Term 1",
                start: "2027-01-13",
                end: "2027-03-19"
            },
            {
                name: "Term 2",
                start: "2027-04-06",
                end: "2027-06-25"
            },
            {
                name: "Term 3",
                start: "2027-07-20",
                end: "2027-09-22"
            },
            {
                name: "Term 4",
                start: "2027-10-05",
                end: "2027-12-08"
            }
        ]
    };


    /* =====================================================
       SCHOOL HOLIDAYS
       These do NOT receive dots.
    ===================================================== */

    const schoolHolidayRanges = {

        2026: [
            ["2026-03-28", "2026-04-07"],
            ["2026-06-27", "2026-07-20"],
            ["2026-09-24", "2026-10-05"],
            ["2026-12-12", "2026-12-31"]
        ],

        2027: [
            ["2027-03-20", "2027-04-05"],
            ["2027-06-26", "2027-07-19"],
            ["2027-09-23", "2027-10-04"],
            ["2027-12-09", "2027-12-31"]
        ]
    };


    /* =====================================================
       PUBLIC HOLIDAYS
    ===================================================== */

    const publicHolidays = {

        2026: {
            "2026-01-01": "New Year's Day",
            "2026-03-21": "Human Rights Day",
            "2026-04-03": "Good Friday",
            "2026-04-06": "Family Day",
            "2026-04-27": "Freedom Day",
            "2026-05-01": "Workers' Day",
            "2026-06-16": "Youth Day",
            "2026-08-09": "National Women's Day",
            "2026-08-10": "National Women's Day observed",
            "2026-09-24": "Heritage Day",
            "2026-12-16": "Day of Reconciliation",
            "2026-12-25": "Christmas Day",
            "2026-12-26": "Day of Goodwill"
        },

        2027: {
            "2027-01-01": "New Year's Day",
            "2027-03-21": "Human Rights Day",
            "2027-03-22": "Human Rights Day observed",
            "2027-03-26": "Good Friday",
            "2027-03-29": "Family Day",
            "2027-04-27": "Freedom Day",
            "2027-05-01": "Workers' Day",
            "2027-06-16": "Youth Day",
            "2027-08-09": "National Women's Day",
            "2027-09-24": "Heritage Day",
            "2027-12-16": "Day of Reconciliation",
            "2027-12-25": "Christmas Day",
            "2027-12-26": "Day of Goodwill",
            "2027-12-27": "Public holiday"
        }
    };


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const calendarTitle =
        document.getElementById("calendarTitle");

    const calendarYear =
        document.getElementById("calendarYear");

    const calendarGrid =
        document.getElementById("calendarGrid");

    const calendarDetail =
        document.getElementById("calendarDetail");

    const currentMonthMessage =
        document.getElementById("currentMonthMessage");

    const upcomingEvents =
        document.getElementById("upcomingEvents");

    const upcomingEventsIntro =
        document.getElementById("upcomingEventsIntro");

    const prevMonthButton =
        document.getElementById("prevMonth");

    const nextMonthButton =
        document.getElementById("nextMonth");


    /* =====================================================
       HELPERS
    ===================================================== */

    function pad(number) {
        return String(number).padStart(2, "0");
    }


    function makeDateKey(year, month, day) {
        return (
            year +
            "-" +
            pad(month + 1) +
            "-" +
            pad(day)
        );
    }


    function todayKey() {
        return makeDateKey(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
        );
    }


    function formatLongDate(dateKey) {

        const parts = dateKey.split("-");

        const date = new Date(
            Number(parts[0]),
            Number(parts[1]) - 1,
            Number(parts[2])
        );

        return date.toLocaleDateString(
            "en-ZA",
            {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );
    }


    function getMonthName(month) {

        return new Date(
            2000,
            month,
            1
        ).toLocaleDateString(
            "en-ZA",
            {
                month: "long"
            }
        );
    }


    function getEventsForDate(dateKey) {

        return schoolEvents.filter(
            event => event.date === dateKey
        );
    }


    function getTermForDateKey(dateKey) {

        const year =
            Number(dateKey.substring(0, 4));

        const terms =
            schoolTerms[year] || [];

        return terms.find(term =>
            dateKey >= term.start &&
            dateKey <= term.end
        ) || null;
    }


    function getTermBoundary(dateKey) {

        const term =
            getTermForDateKey(dateKey);

        if (!term) {
            return null;
        }

        if (dateKey === term.start) {
            return {
                term,
                type: "start"
            };
        }

        if (dateKey === term.end) {
            return {
                term,
                type: "end"
            };
        }

        return null;
    }


    function isSchoolHoliday(dateKey) {

        const year =
            Number(dateKey.substring(0, 4));

        const ranges =
            schoolHolidayRanges[year] || [];

        return ranges.some(range =>
            dateKey >= range[0] &&
            dateKey <= range[1]
        );
    }


    function getPublicHoliday(dateKey) {

        const year =
            Number(dateKey.substring(0, 4));

        return (
            publicHolidays[year] &&
            publicHolidays[year][dateKey]
        ) || null;
    }


    /* =====================================================
       RESET DATE DETAILS
    ===================================================== */

    function resetDateDetails() {

        calendarDetail.innerHTML = `
            <div class="calendar-detail-empty">
                <strong>Select a date</strong>
                <span>
                    Choose a date to see its school information.
                </span>
            </div>
        `;

        document
            .querySelectorAll(".calendar-day.selected")
            .forEach(day => {
                day.classList.remove("selected");
            });
    }


    /* =====================================================
       DATE DETAILS
    ===================================================== */

    function showDateDetails(
        dateKey,
        selectedElement
    ) {

        document
            .querySelectorAll(".calendar-day.selected")
            .forEach(day => {
                day.classList.remove("selected");
            });

        if (selectedElement) {
            selectedElement.classList.add("selected");
        }

        const events =
            getEventsForDate(dateKey);

        const important =
            importantDates[dateKey];

        const publicHoliday =
            getPublicHoliday(dateKey);

        const term =
            getTermForDateKey(dateKey);

        const boundary =
            getTermBoundary(dateKey);


        /* SCHOOL EVENT */

        if (events.length > 0) {

            const event = events[0];

            calendarDetail.innerHTML = `
                <div class="calendar-detail-content">

                    <span class="calendar-detail-label">
                        ${event.category}
                    </span>

                    <h3>
                        ${event.title}
                    </h3>

                    <p>
                        ${formatLongDate(dateKey)}
                    </p>

                    <p>
                        ${event.description}
                    </p>

                    <p>
                        <strong>Time:</strong>
                        ${event.time}
                    </p>

                    <p>
                        <strong>Location:</strong>
                        ${event.location}
                    </p>

                    <p>
                        ${event.ticket}
                    </p>

                    <a
                        href="${event.linkUrl}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        ${event.linkText}
                    </a>

                </div>
            `;

            return;
        }


        /* IMPORTANT DATE */

        if (important) {

            calendarDetail.innerHTML = `
                <div class="calendar-detail-content">

                    <span class="calendar-detail-label">
                        Important date
                    </span>

                    <h3>
                        ${important.title}
                    </h3>

                    <p>
                        ${formatLongDate(dateKey)}
                    </p>

                    <p>
                        ${important.description}
                    </p>

                </div>
            `;

            return;
        }


        /* PUBLIC HOLIDAY */

        if (publicHoliday) {

            calendarDetail.innerHTML = `
                <div class="calendar-detail-content">

                    <span class="calendar-detail-label">
                        Public holiday
                    </span>

                    <h3>
                        ${publicHoliday}
                    </h3>

                    <p>
                        ${formatLongDate(dateKey)}
                    </p>

                    <p>
                        There is no school today.
                        It is a public holiday.
                    </p>

                </div>
            `;

            return;
        }


        /* TERM START / END */

        if (boundary) {

            const wording =
                boundary.type === "start"
                    ? "Begins"
                    : "Ends";

            calendarDetail.innerHTML = `
                <div class="calendar-detail-content">

                    <span class="calendar-detail-label">
                        Term date
                    </span>

                    <h3>
                        ${boundary.term.name} ${wording}
                    </h3>

                    <p>
                        ${formatLongDate(dateKey)}
                    </p>

                    <p>
                        ${
                            boundary.type === "start"
                                ? "The school term begins today."
                                : "The school term ends today."
                        }
                    </p>

                </div>
            `;

            return;
        }


        /* SPECIAL SCHOOL HOLIDAY */

        if (
            important &&
            important.type === "school-holiday"
        ) {
            return;
        }


        /* TERM IN PROGRESS */

        if (term) {

            calendarDetail.innerHTML = `
                <div class="calendar-detail-content">

                    <span class="calendar-detail-label">
                        School term
                    </span>

                    <h3>
                        ${term.name}
                    </h3>

                    <p>
                        ${formatLongDate(dateKey)}
                    </p>

                    <p>
                        School is in session today.
                    </p>

                </div>
            `;

            return;
        }


        /* NOTHING SPECIAL */

        calendarDetail.innerHTML = `
            <div class="calendar-detail-content">

                <span class="calendar-detail-label">
                    School calendar
                </span>

                <h3>
                    No special information
                </h3>

                <p>
                    ${formatLongDate(dateKey)}
                </p>

                <p>
                    There are no confirmed school events,
                    holidays or special dates for this day.
                </p>

            </div>
        `;
    }


    /* =====================================================
       UPCOMING EVENTS
    ===================================================== */

    function renderUpcomingEvents() {

        if (!upcomingEvents) {
            return;
        }

        const monthStart =
            new Date(
                currentYear,
                currentMonth,
                1
            );

        const nextMonthStart =
            new Date(
                currentYear,
                currentMonth + 1,
                1
            );

        const monthEvents =
            schoolEvents
                .filter(event => {

                    const eventDate =
                        new Date(
                            event.date + "T00:00:00"
                        );

                    return (
                        eventDate >= monthStart &&
                        eventDate < nextMonthStart
                    );
                })
                .sort(
                    (a, b) =>
                        a.date.localeCompare(b.date)
                );


        if (monthEvents.length === 0) {

            upcomingEvents.innerHTML = `
                <div class="calendar-detail-empty">
                    <strong>
                        No upcoming events this month
                    </strong>

                    <span>
                        No upcoming events this month confirmed by the school.
                    </span>
                </div>
            `;

            if (upcomingEventsIntro) {
                upcomingEventsIntro.textContent =
                    "No confirmed school events for this month.";
            }

            return;
        }


        if (upcomingEventsIntro) {
            upcomingEventsIntro.textContent =
                "Confirmed school events for this month.";
        }


        upcomingEvents.innerHTML =
            monthEvents.map(event => {

                const date =
                    new Date(
                        event.date + "T00:00:00"
                    );

                const day =
                    date.getDate();

                const month =
                    date.toLocaleDateString(
                        "en-ZA",
                        {
                            month: "short"
                        }
                    ).toUpperCase();

                return `
                    <article class="event-card">

                        <div class="event-date">
                            <strong>${day}</strong>
                            <span>${month}</span>
                        </div>

                        <div class="event-main">

                            <div class="event-meta">
                                ${event.category}
                            </div>

                            <h3>
                                ${event.title}
                            </h3>

                            <p>
                                ${event.summary}
                            </p>

                            <button
                                class="event-details-button"
                                type="button"
                                data-event-date="${event.date}"
                            >
                                View Details →
                            </button>

                        </div>

                    </article>
                `;

            }).join("");


        upcomingEvents
            .querySelectorAll("[data-event-date]")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const eventDate =
                            button.dataset.eventDate;

                        const parts =
                            eventDate.split("-");

                        currentYear =
                            Number(parts[0]);

                        currentMonth =
                            Number(parts[1]) - 1;

                        renderCalendar();

                        const dayElement =
                            calendarGrid.querySelector(
                                `[data-date="${eventDate}"]`
                            );

                        showDateDetails(
                            eventDate,
                            dayElement
                        );

                        const calendarSection =
                            document.querySelector(
                                ".calendar-section"
                            );

                        if (calendarSection) {

                            calendarSection.scrollIntoView({
                                behavior: "smooth",
                                block: "start"
                            });
                        }
                    }
                );
            });
    }


    /* =====================================================
       RENDER CALENDAR
    ===================================================== */

    function renderCalendar() {

        calendarTitle.textContent =
            getMonthName(currentMonth);

        calendarYear.textContent =
            currentYear;


        const isCurrentMonth =
            currentYear === today.getFullYear() &&
            currentMonth === today.getMonth();


        currentMonthMessage.textContent =
            isCurrentMonth
                ? "Today"
                : `${getMonthName(currentMonth)} ${currentYear}`;


        resetDateDetails();

        calendarGrid.innerHTML = "";


        const firstDay =
            new Date(
                currentYear,
                currentMonth,
                1
            ).getDay();


        const daysInMonth =
            new Date(
                currentYear,
                currentMonth + 1,
                0
            ).getDate();


        /* EMPTY CELLS */

        for (
            let i = 0;
            i < firstDay;
            i++
        ) {

            const emptyCell =
                document.createElement("div");

            emptyCell.className =
                "calendar-day calendar-day-empty";

            calendarGrid.appendChild(
                emptyCell
            );
        }


        /* DAYS */

        for (
            let day = 1;
            day <= daysInMonth;
            day++
        ) {

            const dateKey =
                makeDateKey(
                    currentYear,
                    currentMonth,
                    day
                );


            const dayCell =
                document.createElement("button");

            dayCell.type = "button";

            dayCell.className =
                "calendar-day";

            dayCell.dataset.date =
                dateKey;


            /* TODAY */

            if (dateKey === todayKey()) {

                dayCell.classList.add(
                    "is-today"
                );
            }


            /* SCHOOL EVENT */

            const events =
                getEventsForDate(dateKey);

            if (events.length > 0) {

                dayCell.classList.add(
                    "has-event"
                );
            }


            /* TERM */

            const term =
                getTermForDateKey(dateKey);

            if (term) {

                dayCell.classList.add(
                    "has-term"
                );
            }


            /* IMPORTANT DATE */

            const important =
                importantDates[dateKey];

            if (important) {

                dayCell.classList.add(
                    "has-important"
                );
            }


            /* PUBLIC HOLIDAY */

            const publicHoliday =
                getPublicHoliday(dateKey);

            if (publicHoliday) {

                dayCell.classList.add(
                    "has-public-holiday"
                );
            }


            /*
                IMPORTANT:
                Regular school holiday ranges do NOT
                receive markers.

                This keeps December clean except for
                actual public holidays and the school
                closing date.
            */


            /* DATE NUMBER */

            const number =
                document.createElement("span");

            number.className =
                "calendar-day-number";

            number.textContent =
                day;

            dayCell.appendChild(number);


            /* MARKERS */

            const markers =
                document.createElement("span");

            markers.className =
                "calendar-markers";


            /* RED — SCHOOL EVENT */

            if (events.length > 0) {

                const marker =
                    document.createElement("i");

                marker.className =
                    "calendar-marker event-marker";

                marker.title =
                    "School event";

                markers.appendChild(marker);
            }


            /*
                BLUE — PUBLIC HOLIDAY

                This is separate from school events.
            */

            if (publicHoliday) {

                const marker =
                    document.createElement("i");

                marker.className =
                    "calendar-marker public-holiday-marker";

                marker.title =
                    publicHoliday;

                markers.appendChild(marker);
            }


            /*
                BLACK — TERM START / TERM END

                Only the beginning and end of a term
                receive the black term dot.
            */

            const boundary =
                getTermBoundary(dateKey);

            if (boundary) {

                const marker =
                    document.createElement("i");

                marker.className =
                    "calendar-marker term-marker";

                marker.title =
                    boundary.type === "start"
                        ? "Term starts"
                        : "Term ends";

                markers.appendChild(marker);
            }


            /*
                YELLOW — SPECIAL NO-SCHOOL DATE

                Only specifically marked special school
                holidays receive this marker.

                Normal school-holiday ranges do not.
            */

            if (
                important &&
                important.type === "school-holiday"
            ) {

                const marker =
                    document.createElement("i");

                marker.className =
                    "calendar-marker no-school-marker";

                marker.title =
                    "No school";

                markers.appendChild(marker);
            }


            dayCell.appendChild(markers);


            /* CLICK */

            dayCell.addEventListener(
                "click",
                () => {

                    showDateDetails(
                        dateKey,
                        dayCell
                    );
                }
            );


            calendarGrid.appendChild(
                dayCell
            );
        }


        updateNavigation();

        renderUpcomingEvents();
    }


    /* =====================================================
       NAVIGATION
    ===================================================== */

    function updateNavigation() {

        const atBeginning =
            currentYear === MIN_YEAR &&
            currentMonth === 0;

        const atEnd =
            currentYear === MAX_YEAR &&
            currentMonth === 11;

        prevMonthButton.disabled =
            atBeginning;

        nextMonthButton.disabled =
            atEnd;
    }


    prevMonthButton.addEventListener(
        "click",
        () => {

            if (
                currentYear === MIN_YEAR &&
                currentMonth === 0
            ) {
                return;
            }

            currentMonth--;

            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }

            renderCalendar();
        }
    );


    nextMonthButton.addEventListener(
        "click",
        () => {

            if (
                currentYear === MAX_YEAR &&
                currentMonth === 11
            ) {
                return;
            }

            currentMonth++;

            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }

            renderCalendar();
        }
    );


    /* =====================================================
       START
    ===================================================== */

    renderCalendar();

});