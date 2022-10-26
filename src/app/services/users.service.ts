import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, CollectionReference, deleteDoc, doc, docData, DocumentData, Firestore, setDoc, updateDoc, where, query, getDocs } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Log } from '../entities/log';
import { Patient } from '../entities/patient';
import { Specialist } from '../entities/specialist';
import { User } from '../entities/user';

@Injectable({
  	providedIn: 'root'
})
export class UsersService {

	private usersCollection: CollectionReference<DocumentData>;
	private logsCollection: CollectionReference<DocumentData>;

  	constructor(private _firestore: Firestore) {
		this.usersCollection = collection(this._firestore, 'users');
		this.logsCollection = collection(this._firestore, 'logs');
		console.log(this.usersCollection);
	}

	getAll() {
		return collectionData(this.usersCollection, {
		  idField: 'id',
		}) as Observable<User[]>;
	}

	get(id: string) {
		const usersDocumentReference = doc(this.usersCollection, id);
		return docData(usersDocumentReference, { idField: 'id' })  as Observable<User>;
	}

	async getUserByEmail(email: string) {
		const q = query(this.usersCollection, where("email", "==", email));
		const querySnapshot = await getDocs(q);
		let documents:User[] = [];
		querySnapshot.docs.forEach(doc => {
			let docData = doc.data() as User;
			documents.push(docData);
		})
		return documents;
	}

	create(user: User) {
		if (!user) {
			return;
		}

		console.log(user.images)

		// Crea un nuevo documento con los datos del usuario, dentro de la colección 'users'
		let newUserDocRef = doc(this.usersCollection);

		switch (user.type) {
			case 'SPECIALIST':
				let specialist = user as Specialist;
				setDoc(newUserDocRef, {
					id: newUserDocRef.id,
					email: specialist.email,
					approvedProfile: specialist.approvedProfile,
					//password: specialist.password,
					type: specialist.type,
					name: specialist.name,
					surname: specialist.surname,
					birthDate: specialist.birthDate,
					dni: specialist.dni,
					images: JSON.parse( JSON.stringify(specialist.images) ),
					speciality: specialist.speciality
				})
				break;
			case 'PATIENT':
				let patient = user as Patient;
				setDoc(newUserDocRef, {
					id: newUserDocRef.id,
					email: patient.email,
					approvedProfile: patient.approvedProfile,
					//password: patient.password,
					type: patient.type,
					name: patient.name,
					surname: patient.surname,
					birthDate: patient.birthDate,
					dni: patient.dni,
					images: JSON.parse( JSON.stringify(patient.images) ),
					healthInsurance: patient.healthInsurance
				})
				break;
			default:
				setDoc(newUserDocRef, {
					id: newUserDocRef.id,
					email: user.email,
					approvedProfile: user.approvedProfile,
					//password: user.password,
					type: user.type,
					name: user.name,
					surname: user.surname,
					birthDate: user.birthDate,
					dni: user.dni,
					images: JSON.parse( JSON.stringify(user.images) )
				})
			break;
		}

		// Crea una nueva colección dentro del documento del usuario, para añadir los logs
		user.id = newUserDocRef.id;
		//this.pushLoginLog(user);
		
		return newUserDocRef;
	}

	createLog(log:Log){
		let newLogDocRef = doc(this.logsCollection);
		setDoc(newLogDocRef, {
			id: newLogDocRef.id,
			userId: log.userId,
			createdDate: log.createdDate,
			value: log.value
		})
	}

	update(user: User) {
		let id:string = user.id;
		const userDocumentReference = doc(this.usersCollection, id);

		switch (user.type) {
			case 'SPECIALIST':
				let specialist = user as Specialist;
				updateDoc(userDocumentReference, {
					id: specialist.id,
					email: specialist.email,
					approvedProfile: specialist.approvedProfile,
					//password: specialist.password,
					type: specialist.type,
					name: specialist.name,
					birthDate: specialist.birthDate,
					dni: specialist.dni,
					images: JSON.parse( JSON.stringify(specialist.images) ),
					speciality: specialist.speciality
				})
				break;
			case 'PATIENT':
				let patient = user as Patient;
				updateDoc(userDocumentReference, {
					id: patient.id,
					email: patient.email,
					approvedProfile: patient.approvedProfile,
					//password: patient.password,
					type: patient.type,
					name: patient.name,
					birthDate: patient.birthDate,
					dni: patient.dni,
					images: JSON.parse( JSON.stringify(patient.images) ),
					healthInsurance: patient.healthInsurance
				})
				break;
			default:
				updateDoc(userDocumentReference, {
					id: user.id,
					email: user.email,
					approvedProfile: user.approvedProfile,
					//password: user.password,
					type: user.type,
					name: user.name,
					birthDate: user.birthDate,
					dni: user.dni,
					images: JSON.parse( JSON.stringify(user.images) )
				})
			break;
		}
	}

	async pushLoginLog(user:User){
		let loginLog = new Log('Login', user.id);
		if (!loginLog.userId) {
			let data = await this.getUserByEmail(user.email);
			loginLog.userId =  data[0]['id'];	
		}
		this.createLog(loginLog);
	}  

	delete(id: string) {
		const userDocumentReference = doc(this._firestore, `users/${id}`);
		return deleteDoc(userDocumentReference);
	}
}
