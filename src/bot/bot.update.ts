import { Update, Start, Ctx, On, Hears, Command, Action } from "nestjs-telegraf";
import { Context, Markup } from "telegraf";
import { BotService } from "./bot.service";


@Update()
export class BotUpdate {
    constructor(private readonly botService: BotService){}

    @Start()
    async onStart(@Ctx() ctx:Context) {
        return this.botService.start(ctx)
    }

    @On('contact')
    async onContact(@Ctx() ctx:Context) {
        return this.botService.onContact(ctx)
    }

    @Command('stop')
    async onStop(@Ctx() ctx:Context) {
        return this.botService.onStop(ctx)
    }

}