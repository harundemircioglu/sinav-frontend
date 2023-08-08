import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/core/services/auth/auth.service';
import { User } from 'src/core/models/user.model';
import { Router } from '@angular/router';
import { TweetRequest } from 'src/core/models/request/tweet-request.model';
import { ApiService } from 'src/core/services/api/api.service';
import { Tweet } from 'src/core/models/tweet.model';
import { ResponseStatus } from 'src/core/models/response/base-response.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MessageService]
})
export class HomeComponent implements OnInit {

  tweetRequest: TweetRequest = <TweetRequest>{};

  tweets: Tweet[] = [];

  likedTweet: Tweet | undefined;

  tweetContainer: boolean = true;

  constructor(
    private authService: AuthService,
    public router: Router,
    protected apiService: ApiService,
    private messageService: MessageService
  ) { }

  currentUser: User | null = null;

  newTweet() {
    this.tweetContainer = false;
  }

  send(entity: TweetRequest) {
    entity.user_id = this.currentUser?.id || 0;
    this.createEntity<TweetRequest>(entity, 'Tweet').then(response => {
      console.log(response?.message);
      this.tweetContainer = true;
      this.tweetRequest.tweet_header = "";
      this.tweetRequest.tweet_detail = "";
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Tweet gönderildi' });
      this.refresh();
    })
  }

  createEntity<TEntity>(entity: TEntity, entityType: string) {
    return this.apiService.createEntity<TEntity>(entity, entityType);
  }

  like(id: number, updatedTweet: Tweet) {
    this.apiService.getEntityById<Tweet>(id, Tweet).then(tweetResponse => {
      if (tweetResponse?.status === ResponseStatus.Ok && tweetResponse.data) {
        const tweet = tweetResponse.data;
        tweet.likes = (tweet.likes || 0) + 1;
        this.update(id, tweet).then(updateResponse => {
          if (updateResponse?.status === ResponseStatus.Ok) {
            this.likedTweet = tweet;
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Tweet beğenildi' });
            this.refresh();
          }
        }).catch(error => {
          console.error('Tweet güncellenirken bir hata oluştu:', error);
        });
      }
    }).catch(error => {
      console.error('Tweet alınırken bir hata oluştu:', error);
    });
  }

  update(id: number, updatedTweet: Tweet) {
    return this.apiService.updateEntity(id, updatedTweet, Tweet);
  }

  close() {
    this.tweetContainer = true;
  }

  refresh() {
    this.apiService.getAllEntities(Tweet).subscribe(response => {
      this.tweets = response.data;
    })
  }

  ngOnInit() {
    this.refresh();
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      if (!this.currentUser) {
        this.router.navigate(['/']);
      }
    });
  }
}
