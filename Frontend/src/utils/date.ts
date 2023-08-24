export const FormatThai = (date: Date) => {
    const options = {
        year: 'numeric' as const,
        month: 'long' as const,
        day: 'numeric' as const,
        timeZone: 'Asia/Bangkok' as const
    };

    return new Intl.DateTimeFormat('th-TH', options).format(date);
}