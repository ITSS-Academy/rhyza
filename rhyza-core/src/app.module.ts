import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SupabaseModule } from './supabase/supabase.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './auth/firebase-auth.middleware';
import { CategoryModule } from './category/category.module';
import { SongModule } from './song/song.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SupabaseModule,
    AuthModule,
    CategoryModule,
    SongModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes
      // { path: 'songs', method: RequestMethod.POST },
      // { path: 'songs', method: RequestMethod.DELETE },
      // { path: 'auth', method: RequestMethod.GET },
      // { path: 'auth', method: RequestMethod.POST },
      ();
  }
}
