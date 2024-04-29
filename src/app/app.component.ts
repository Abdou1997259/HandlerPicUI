import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ImageService } from './services/image.service';
import { HttpEventType } from '@angular/common/http';
import { Blob } from 'buffer';
import { URL } from 'url';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'PictureHandle.UI';
  form!:FormGroup;
  filetoUpload!:any;
  imgeUrl!:any;
  progress:any=0;
  message:any="";
  imageName:any="";
  constructor(
    private fb:FormBuilder,
    private service:ImageService
    
    ){

  }
  ngOnInit(): void {
    this.form=this.fb.group({
      caption:[''],
      imageFile:['']
    })
  }
  detectFile(event:any){
 

    if(event.target.files instanceof FileList)
    {
      this.filetoUpload =event.target.files[0];
      const reader=new FileReader();
      reader.readAsDataURL(this.filetoUpload);
      reader.onloadend=(e)=>
      {debugger
        this.imgeUrl=e?.target?.result;
      }
    

    }
  }
  upload()
  {
    debugger
    var formdata=new FormData()
    formdata.append("caption",this.form.value.caption)
    formdata.append("name","unknown")
    formdata.append("imageFile",this.filetoUpload)
    this.service.upload(formdata).subscribe((event)=>{
      if(event.type==HttpEventType.UploadProgress)
      this.progress = Math.round(100 * event.loaded / (event?.total ||1 ));
    else if(event.type==HttpEventType.Response)
    {
      this.message="File Successfully Uploaded"
    }
    });

  }
  getPic(){
    debugger
    this.service.getPicture((this.imageName as string ).trim()).subscribe((res:any)=>{
      
     var reader=new FileReader();
    reader.readAsDataURL(res)
    reader.onloadend=(e)=>{
      this.imgeUrl=e?.target?.result;
      debugger
    }
      console.log(res);
    })
  }

}
