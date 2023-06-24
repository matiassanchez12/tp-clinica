import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private http: HttpClient) {}

  uploadFileToCloud(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'matias');

    return this.http.post(
      'https://api.cloudinary.com/v1_1/matiaskaufman/image/upload',
      formData
    );
  }
}
