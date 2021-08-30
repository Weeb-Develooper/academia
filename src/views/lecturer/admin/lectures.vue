<script>
import axios from "axios";
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId } from "@/plugins/event-utils";

export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },

  data: function() {
    return {
      dialog: false,
      modalMsg: "",
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin, // needed for dateClick
        ],
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        },
        initialView: "dayGridMonth",
        initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.currentEvents,
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
      },
      currentEvents: [],
    };
  },

  methods: {
    handleWeekendsToggle() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends; // update a property
    },

    handleDateSelect(selectInfo) {
      let title = prompt("Please enter a new title for your event");
      let calendarApi = selectInfo.view.calendar;

      calendarApi.unselect(); // clear date selection

            this.modalMsg = "Creating lecture...";
      this.dialog = true;
      axios
        .post(`${process.env.VUE_APP_API_BASE_URL}/events`, {
          course: this.$route.params.id,
          end: selectInfo.endStr,
          start: selectInfo.startStr,
          eventTitle: title,
          teacher: this.$store.state.user.teacher.id.toString(),
        })
        .then(() => {
          // Handle success.
          this.dialog = false;
          this.courseDialog = false;
          if (title) {
        calendarApi.addEvent({
          id: createEventId(),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay,
        });
      }
        })
        .catch((error) => {
          // Handle error.
          this.dialog = false;
          this.loading = false;
          console.log("An error occurred:", error.response);
        });
    },

    handleEventClick(clickInfo) {
      if (
        confirm(
          `Are you sure you want to delete the lecture '${clickInfo.event.title}'`
        )
      ) {
        clickInfo.event.remove();
      }
    },

    handleEvents() {
      return this.currentEvents;
    },

    getEvents() {
      this.loading = true;
      axios
        .get(
          `${
            process.env.VUE_APP_API_BASE_URL
          }/events?teacher=${this.$store.state.user.teacher.id.toString()}`
        )
        .then((response) => {
          // Handle success.
          this.loading = false;
          this.currentEvents = response.data;
        })
        .catch((error) => {
          // Handle error.
          this.loading = false;
          console.log("An error occurred:", error.response);
        });
    }
  },

  mounted() {
    this.getEvents();
  }
};
</script>

<template>
  <div class="demo-app">
    <div class="demo-app-sidebar">
      <div class="demo-app-sidebar-section">
        <h2>Instructions</h2>
        <ul>
          <li>Select dates and you will be prompted to create a new lecture</li>
          <li>Drag, drop, and resize lectures</li>
          <li>Click an lecture to delete it</li>
        </ul>
      </div>
      <div class="demo-app-sidebar-section">
        <v-checkbox
          :checked="calendarOptions.weekends"
          @change="handleWeekendsToggle"
          color="indigo darken-3"
          dense
          :label="`Toggle weekends`"
        ></v-checkbox>
      </div>
      <div class="demo-app-sidebar-section">
        <h2>All Lectures ({{ currentEvents.length }})</h2>
        <ul>
          <li v-for="event in currentEvents" :key="event.id">
            <b>{{ event.start }}</b>
            <i>{{ event.title }}</i>
          </li>
        </ul>
      </div>
    </div>
    <div class="demo-app-main">
      <FullCalendar class="demo-app-calendar" :options="calendarOptions">
        <template v-slot:eventContent="arg">
          <b>{{ arg.timeText }}</b>
          <i>{{ arg.event.title }}</i>
        </template>
      </FullCalendar>
    </div>
    <v-dialog v-model="dialog" hide-overlay persistent width="300">
      <v-card color="blue darken-1" class="pt-2" dark>
        <v-card-text>
          {{ modalMsg }}
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<style lang="css">
h2 {
  margin: 0;
  font-size: 16px;
}

ul {
  margin: 0;
  padding: 0 0 0 1.5em;
}

li {
  margin: 1.5em 0;
  padding: 0;
}

b {
  /* used for event dates/times */
  margin-right: 3px;
}

.demo-app {
  display: flex;
  min-height: 100%;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}

.demo-app-sidebar {
  width: 300px;
  line-height: 1.5;
  background: #eaf9ff;
  border-right: 1px solid #d3e2e8;
}

.demo-app-sidebar-section {
  padding: 2em;
}

.demo-app-main {
  flex-grow: 1;
  padding: 3em;
}

.fc {
  /* the calendar root */
  max-width: inherit;
  margin: 0 auto;
}

a {
  color: #000 !important;
}
</style>
