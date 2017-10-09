import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AngularFireDatabase} from 'angularfire2/database';
import { LocalStorage } from '../providers/local-storage';

@Injectable()
export class HttpClient {

    servers: Array<any>=[];
    slackDetail: any;
    constructor(public http: Http,
        private db: AngularFireDatabase,
        private _localStorage: LocalStorage
    ) {
        this.slackDetail = this._localStorage.getSlackDetail();
        if(this.slackDetail === undefined || this.slackDetail === null || this.slackDetail.length == 0){
            this.db.list('/slack').subscribe(data => {
                this.slackDetail = data[0];
                this._localStorage.addSlackDetail(this.slackDetail);
            },
            error =>{
                this.db.list('/servers').subscribe(data => {
                    this.servers = data.filter(server => server.active).map(server => { return server.url; });
                });
            }
        );    
        }
    }

    buy(orders: Array<any>, enteredAddress) {
        let items = orders.map(order => {
            let item = {
                "name": order.product_name,
                "price": order.price
            }
            return item;
        });
        let total = 0;
        orders.forEach(order => {total = order.price + total});

        let orderJson = {
            "userId": 0,
            "name": enteredAddress.name,
            "phone": enteredAddress.mobile,
            "address": {
                "id": 0,
                "address": enteredAddress.address
            },
            "items": items
        }
        let slackText = this.composeOrderText(orderJson, total);
        let slck = this.slackDetail;
        let slackJson = this.composeSlackJson(slackText, slck.orderChannel, slck.asUser, enteredAddress.name + " " + enteredAddress.mobile);
        
        this.postWithFireUrl(orderJson, "orders");
        return this.http.post(slck.slackUrl, JSON.stringify(slackJson));
    }

    composeOrderText(ordderJson, total) {
        let start = "***************New Order*********************\n";
        let end = "*********************************************";
        let customerName = "```Customer Name = " + ordderJson.name + "```\n";
        let phone = "```Customer phone = " + ordderJson.phone + "```\n";
        let address = "```Customer address = \n" + ordderJson.address.address + "```\n";
        let items = "```Items = \n";
        for(let i = 0; i < ordderJson.items.length; i++){
            items = items + (i + 1) + " " + ordderJson.items[i].name + "\n"
        }
        items = items + "\n Total = " + total + "\n"
        items = items + "```"

        return start + customerName + phone + address + items + end;
    }

    postWithFireUrl(json, urlSuffix) {
        return Observable.forkJoin(this.servers.map(url => {
            let resultJson = this.http.post(url + urlSuffix,
                json).map(data => {
                    return data.json();
                });
            return resultJson;
        }));
    }

    postWish(wish, enteredAddress) {
        const wishJson = {
            "name": wish.wishName,
            "description": wish.wishDescription,
            "phone": enteredAddress.mobile
        };

        let slackText = this.composeWishText(wishJson, enteredAddress.name);
        let slck = this.slackDetail;
        let slackJson = this.composeSlackJson(slackText, slck.feedbackChannel, slck.asUser, enteredAddress.name + " " + enteredAddress.mobile);
        this.postWithFireUrl(wishJson, "wish");
        return this.http.post(slck.slackUrl, JSON.stringify(slackJson));
    }

    composeWishText(wish, name) {
        let start = "***************New Feedback*********************\n";
        let end = "************************************************";
        let customerName = "```Customer Name = " + name + "```\n";
        let phone = "```Customer phone = " + wish.phone + "```\n";
        let title = "```Feedback Title = " + wish.name + "```\n";
        let description = "```Feedback Description = \n" + wish.description + "```\n";
        return start + customerName + phone + title + description + end;
    }

    composeSlackJson(text, channel, as_user, username) {
        const slackJson = {
            "text": text,
            "channel" :channel,
            "as_user": as_user,
            "username": username
        }
        return slackJson;
    }


}