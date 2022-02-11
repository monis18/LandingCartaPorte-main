export class User{
	id: number;
	name: string;
	email: string;
	user_name: string;
	password: string;
	rfc: string;
	phone: string;
	plan: number
	accessToken?:string

	constructor(){
		this.clear();
	}

	clear(): void {
		this.id= undefined;
		this.name= '';
		this.email= '';
		this.user_name= '';
		this.password= '';
		this.rfc= '';
		this.phone= '';
		this.plan= 2557
	}
}
