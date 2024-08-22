import moment from 'moment';

export default class DateUtils {
    static createMaxDate() {
        const targetDate = new Date('2200-12-31T00:00:00Z');
        return targetDate;
    }

    // 格式: YYYY-MM-DD HH:mm:ss
    static formatDateToString(date: Date): string {
        if (!date) return "永久"
        return moment(date).format('YYYY-MM-DD HH:mm:ss')
    }

    static covertStringToDate(date: string): Date {
        return moment(date).toDate()
    }

}