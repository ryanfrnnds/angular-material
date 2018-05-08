import * as _moment from 'moment';
const moment =  _moment;

export class DataUtilitario {
    private static singleton: DataUtilitario = null;

    private constructor() {}

    public static Instance(): DataUtilitario {
        if (this.singleton == null) {
            this.singleton = new DataUtilitario();
        }
        return this.singleton;
    }

    public subtrairDias(data: Date, dias): Date {
		if (data) {
			const dataMoment = moment(data);
			return dataMoment.subtract(dias, 'days').toDate();
		}
		return null;
	}

	public adicionarDias(data: Date, dias): Date {
		if (data) {
			const dataMoment = moment(data);
			return dataMoment.add(dias, 'days').toDate();
		}
		return null;
	}
}
