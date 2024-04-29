import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Blob } from 'buffer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  
  constructor(private _http:HttpClient) { }
  upload(fromdata:any)
  {
    return this._http.post("https://localhost:7224/api/Image",fromdata,{responseType: 'text',observe:'events',reportProgress:true});
  }
  getPicture(name:any)
  {
     return this._http.get("https://localhost:7224/Resources/"+name,{responseType: 'blob'});
  }
}
