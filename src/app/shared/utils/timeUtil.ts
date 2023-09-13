export const timeStampToDateString = (timeStamp: number): string => {
    const d = new Date(timeStamp * 1000);
    return d.toLocaleString();
}
