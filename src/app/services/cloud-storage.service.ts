import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FileUpload } from 'primeng/fileupload';
import { finalize, Observable } from 'rxjs';


@Injectable({
  	providedIn: 'root'
})
export class CloudStorageService {

	uploadPercent: Observable<number | undefined> = new Observable<number>();
  	downloadURL: Observable<string | undefined> = new Observable<string>();
  	
	constructor(private storage: AngularFireStorage) {}
  
	uploadFile(event:any) {
		const file = event.target.files[0];
		const filePath = 'name-your-file-path-here';
		const fileRef = this.storage.ref(filePath);
		const task = this.storage.upload(filePath, file);

		// observe percentage changes
		this.uploadPercent = task.percentageChanges();
		// get notified when the download URL is available
		task.snapshotChanges().pipe(
			finalize(() => this.downloadURL = fileRef.getDownloadURL() )
		).subscribe()
	}
}
