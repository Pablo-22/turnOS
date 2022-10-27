import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Timestamp } from '@angular/fire/firestore';
import { FileUpload } from 'primeng/fileupload';
import { finalize, lastValueFrom, Observable } from 'rxjs';


@Injectable({
  	providedIn: 'root'
})
export class CloudStorageService {

	uploadPercent: Observable<number | undefined> = new Observable<number>();
  	downloadURL: Observable<string | undefined> = new Observable<string>();
  	
	constructor(private storage: AngularFireStorage) {}
  
	async uploadFile(file:File) {
		const date = new Date()
		date.setMinutes( date.getMinutes() + date.getTimezoneOffset() ); // Para corregir problemas de zona horaria
		let timestamp = Timestamp.fromDate(date)

		const filePath = 'profileImg/' + file.name + '-' + timestamp.toMillis();
		const fileRef = this.storage.ref(filePath);
		const task = this.storage.upload(filePath, file);

		// observe percentage changes
		this.uploadPercent = task.percentageChanges();
		await lastValueFrom(task.percentageChanges());
		// get notified when the download URL is available
		return lastValueFrom(fileRef.getDownloadURL());
	}
}
