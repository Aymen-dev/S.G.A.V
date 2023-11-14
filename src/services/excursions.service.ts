import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Excursion } from './excursion';

@Injectable({
  providedIn: 'root'
})
export class ExcursionService {
  private APIAddExcUrl = 'http://localhost:8080/API/excursions/addExcursion.php';
  private APIDelExcUrl = 'http://localhost:8080/API/excursions/deleteExcursion.php';
  private APIGetExcUrl = 'http://localhost:8080/API/excursions/getExcursions.php';
  private APIGetExcByIdURL = "http://localhost:8080/API/excursions/getExcursionById.php";
  private APIGetExcByNameURL = "http://localhost:8080/API/excursions/getExcursionByName.php";
  private APIGetExcByChauffeurURL = "http://localhost:8080/API/excursions/getExcursionsByChauffeur.php";

  constructor(private http: HttpClient) { }

  getExcursions(): Observable<any> {
    return this.http.get<any>(this.APIGetExcUrl);
  }

  addExcursion(
    idChauffeur: number,
    nom: string,
    destination: string,
    description: string,
    image: File,
    prix: number,
    dateDebut: string,
    dateFin: string
  ) {
    const formData = new FormData();
    formData.append('idChauffeur', idChauffeur.toString());
    formData.append('nom', nom);
    formData.append('destination', destination);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('prix', prix.toString());
    formData.append('dateDebut', dateDebut);
    formData.append('dateFin', dateFin);

    return this.http.post(this.APIAddExcUrl, formData);
  }

  deleteExcursion(excursionId: number) {
    const url = `${this.APIDelExcUrl}?id=${excursionId}`;
    return this.http.delete(url);
  }

  getExcursionById(id: number) {
    const url = `${this.APIGetExcByIdURL}?id=${id}`;
    return this.http.get<Excursion>(url);
  }

  getExcursionsByChauffeur(userId: number) {
    const url = `${this.APIGetExcByChauffeurURL}?id=${userId}`;
    return this.http.get<Excursion>(url);
  }

  getExcursionByName(name: string) {
    const url = `${this.APIGetExcByNameURL}?name=${name}`;
    return this.http.get<Excursion>(url);
  }
}
