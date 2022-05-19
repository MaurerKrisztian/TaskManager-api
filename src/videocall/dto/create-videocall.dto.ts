import {IsBoolean, IsNumber, IsOptional, IsString, ValidateNested} from "class-validator";
import {Type} from "class-transformer";
import {IRoomOptions} from "@maurerkrisztian/dailyco-api-client";

export class CreateVideocallDto {}



export class RoomPropertiesDto {
    @IsOptional()
    @IsBoolean()
        enable_knocking?: boolean;

    @IsOptional()
    @IsNumber()
        nbf?: number;

    @IsOptional()
    @IsNumber()
        exp?: number;

    @IsOptional()
    @IsNumber()
        max_participants?: number;

    @IsOptional()
    @IsBoolean()
        autojoin?: boolean;

    @IsOptional()
    @IsBoolean()
        enable_screenshare?: boolean;

    @IsOptional()
    @IsBoolean()
        enable_chat?: boolean;

    @IsOptional()
    @IsBoolean()
        start_video_off?: boolean;

    @IsOptional()
    @IsBoolean()
        start_audio_off?: boolean;

    @IsOptional()
    @IsBoolean()
        owner_only_broadcast?: boolean;

    @IsOptional()
    @IsString()
        enable_recording?: string;

    @IsOptional()
    @IsBoolean()
        eject_at_room_exp?: boolean;

    @IsOptional()
    @IsNumber()
        eject_after_elapsed?: number;

    @IsOptional()
    @IsString()
        lang?: string;
}


export class RoomDto implements IRoomOptions {
    @IsString()
        name: string;

    @IsOptional()
    @IsString()
        privacy?: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => RoomPropertiesDto)
        properties?: RoomPropertiesDto;
}


export class CreateMeetingDto {
    @ValidateNested()
    @Type(() => RoomDto)
        room: RoomDto;

    @ValidateNested({each: true})
    @Type(() => MemberDto)
        members: MemberDto[];

    @IsOptional()
        meta: any;
}
export class MemberDto {
    @IsString()
        name: string;

    @IsString()
        email: string;
}
