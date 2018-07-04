import veCalendar from './lib/ve-calendar.vue'
import veYear from './lib/ve-year.vue'
import veDatePicker from './lib/ve-date-picker/index.vue'

export function install(Vue) {
    Vue.component(veCalendar.name, veCalendar)
    Vue.component(veYear.name, veYear)
    Vue.component(veDatePicker.name,veDatePicker)
    /* -- Add more components here -- */
}
export default veCalendar