import {ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef} from '@angular/core';
import {ModalComponent} from "../modal/modal.component";
import {Subject} from "rxjs";
import {Question} from "../model/question";

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private componentRef!: ComponentRef<ModalComponent>;
  private componentSubscriber!: Subject<any>;
  constructor(private resolver: ComponentFactoryResolver) {}

  openModal(entry: ViewContainerRef) {
    let factory = this.resolver.resolveComponentFactory(ModalComponent);
    this.componentRef = entry.createComponent(factory);
    this.componentRef.instance.closeEvent.subscribe(() => this.closeModal());
    this.componentRef.instance.confirmEvent.subscribe(question => this.confirm(question));
    this.componentSubscriber = new Subject<string>();
    return this.componentSubscriber.asObservable();
  }

  closeModal() {
    this.componentSubscriber.complete();
    this.componentRef.destroy();
  }

  confirm(question: Question) {
    this.componentSubscriber.next(question);
    this.closeModal();
  }
}
