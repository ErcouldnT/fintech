import { format, parse, addDays, subDays } from 'date-fns';
import { tr } from 'date-fns/locale';

export const dateToSlug = (date: Date) => {
	return format(date, 'P', { locale: tr });
};

export const nextDay = (date: Date) => {
	return dateToSlug(addDays(date, 1));
};

export const previousDay = (date: Date) => {
	return dateToSlug(subDays(date, 1));
};

export const parseDate = (dateString: string): Date => {
	// 'dd.MM.yyyy' formatına uygun olarak tarihi parse ediyoruz.
	return parse(dateString, 'dd.MM.yyyy', new Date());
};

export const openDate = (date: Date) => {
	return format(date, 'd MMMM yyyy EEEE', { locale: tr });
};
