import veCalendar from './lib/ve-calendar.vue'
import veYear from './lib/ve-year.vue'

export function install(Vue) {
    Vue.component(veCalendar.name, veCalendar)
    Vue.component(veYear.name,veYear)
    /* -- Add more components here -- */
}
export default veCalendar