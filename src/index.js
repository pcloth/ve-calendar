import veCalendar from './vue-easy-calendar/calendar.vue';

veCalendar.install = function(Vue) {
  Vue.component(veCalendar.name, veCalendar);
};

export default veCalendar;