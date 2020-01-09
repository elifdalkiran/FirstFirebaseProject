import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from "rxjs/operators";
import { AngularFirestore } from '@angular/fire/firestore';

export interface Item {
    title: string;
    description: string;
    tag: string;
    date: Date
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnDestroy {
  title ='praogrammingtips';

  loading: boolean = true;
  itemCollection: Observable<any[]>;
  items:Item[] = [];
  firstItem: Item;

  private unsubscribe$ = new Subject<void>();

  constructor(private db: AngularFirestore) {}
  
  ngOnInit(): void {
    this.itemCollection = this.db.collection('items').valueChanges();
    
    this.itemCollection
    .pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe(data => {
      this.items = data.slice(1);
      this.firstItem = data[0];
      // console.log('zxfg');
    });
  }

  ngOnDestroy(): void{
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
