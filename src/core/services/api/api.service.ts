/*Bu ApiService, Angular uygulamasının sunucuyla iletişim kurmasını sağlar
ve AuthService tarafından kullanılarak kullanıcı girişi, kaydı, token yenileme ve profil
 bilgisi alma gibi işlemleri gerçekleştirir. */

import { Injectable, Type } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, share } from 'rxjs';
import { environment } from '../../../../src/environments/environment';
import { BaseDataResponse } from '../../models/response/base-data-response.model';
import { TokenResponse } from '../../models/response/token-response.model';
import { LoginRequest } from '../../models/request/login-request.model';
import { RegisterRequest } from '../../models/request/register-request.model';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private endpoint = environment.api_url;

  //constructor fonksiyonu, HttpClient nesnesini enjekte eder ve HTTP isteklerini yapmak için kullanır.

  constructor(private readonly http: HttpClient) { }

  //login fonksiyonu, kullanıcı giriş isteğini gerçekleştirir.
  // HttpClient.post fonksiyonunu kullanarak API'ye LoginRequest nesnesini ve isteği yapar.

  login(request: LoginRequest): Observable<BaseDataResponse<TokenResponse>> {
    return this.http
      .post<BaseDataResponse<TokenResponse>>(
        this.endpoint + '/Auth/Login',
        request
      )
      .pipe(
        map((result) => {
          return result;
        })
      );
  }
  //register fonksiyonu, kullanıcı kayıt isteğini gerçekleştirir.
  // HttpClient.post fonksiyonunu kullanarak API'ye RegisterRequest nesnesini ve isteği yapar.

  register(request: RegisterRequest): Observable<BaseDataResponse<TokenResponse>> {
    return this.http
      .post<BaseDataResponse<TokenResponse>>(
        this.endpoint + '/Auth/Register',
        request
      )
      .pipe(
        map((result) => {
          return result;
        })
      );
  }


  //Görüntüleme kodları
  getAllEntities<TEntity>(entityType: Type<TEntity>) {
    return this.http.request<BaseDataResponse<TEntity[]>>("get", environment.api_url + "/" + entityType.name + "/GetAll").pipe(share());
  }


  //Araç ekleme kodları
  // addCar(carRequest: CarRequest): Observable<BaseDataResponse<Car>> {
  //   return this.http.post<BaseDataResponse<Car>>(this.endpoint + "/Car/Create", carRequest);
  // }


  //Ekleme kodları
  createEntity<TEntity>(entity: TEntity, entityType: string) {
    return this.http.post<BaseDataResponse<TEntity[]>>(environment.api_url + "/" + entityType + "/Create", entity).pipe(share()).toPromise();
  }

  //Silme kodları
  deleteEntity<TEntity>(id: number, entityType: Type<TEntity>) {
    return this.http.delete<BaseDataResponse<TEntity[]>>(environment.api_url + "/" + entityType.name + "/Delete?id=" + id).pipe(share()).toPromise();
  }

  //GetById kodları
  getEntityById<TEntity>(id: number, entityType: Type<TEntity>) {
    return this.http.get<BaseDataResponse<TEntity>>(`${environment.api_url}/${entityType.name}/GetById?id=${id}`).pipe(share()).toPromise();
  }

  //Get by Id kodları
  // getEntityById<TEntity>(id: number, entityType: Type<TEntity>) {
  //   return this.http.get<BaseDataResponse<TEntity[]>>(environment.api_url + "/" + entityType.name + "/GetById?id=" + id).pipe(share()).toPromise();
  // }

  //Güncelleme kodları
  updateEntity<TEntity>(id: number, entity: TEntity, entityType: Type<TEntity>) {
    return this.http.put<BaseDataResponse<TEntity>>(environment.api_url + "/" + entityType.name + "/Update?id=" + id, entity).pipe(share()).toPromise();
  }


  //refreshToken fonksiyonu, token yenileme isteğini gerçekleştirir.
  //HttpClient.get fonksiyonunu kullanarak API'ye token parametresini içeren bir istek gönderir.

  refreshToken(token: string): Observable<BaseDataResponse<TokenResponse>> {
    return this.http
      .get<BaseDataResponse<TokenResponse>>(
        this.endpoint + '/Auth/RefreshToken',
        { params: new HttpParams().append('token', token) }
      )
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

  //getProfileInfo fonksiyonu, kullanıcının profil bilgilerini almak için bir istek gönderir.
  //HttpClient.get fonksiyonunu kullanarak API'ye istek gönderir

  getProfileInfo(): Observable<BaseDataResponse<User>> {
    return this.http
      .get<BaseDataResponse<User>>(this.endpoint + '/Auth/GetProfileInfo')
      .pipe(
        map((result) => {
          return result;
        })
      );
  }
}
