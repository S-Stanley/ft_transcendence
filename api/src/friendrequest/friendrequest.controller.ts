import { Body, Controller, Get, Injectable, Param, Post } from "@nestjs/common";
import { UserConnected } from "src/configs/userconnected.decorator";
import { Users } from "src/entities/user.entity";
import { FriendRequestService } from "src/services/friend_request.service";

@Controller('friends')
@Injectable()
export class FriendRequestController {
    constructor(private userService: FriendRequestService) {}

    @Get('/requests/:user')
    getFriendshipStatusAction(@Param('user') otherUser: string, @UserConnected() user: Users): Promise<any> {
        return this.userService.getFriendshipStatus(otherUser, user);
    }

    @Post('/sendrequest/:friend')
    sendFriendRequestAction(@Param('friend') friend: string, @Body() body: { nickname: string }): Promise<void> {
        return this.userService.sendFriendRequest(friend, body.nickname);
    }

    @Get('/requests')
    getReceivedFriendRequestsAction(@UserConnected() user: Users): Promise<any> {
        return this.userService.getReceivedFriendRequests(user);
    }

    @Post('/requests/:user/accept')
    acceptDeclineFriendRequestAction(@Param('user') otherUser: string, @Body() body: { nickname: string, accept: boolean }): Promise<void> {
        return this.userService.acceptDeclineFriendRequest(otherUser, body.nickname, body.accept);
    }
}