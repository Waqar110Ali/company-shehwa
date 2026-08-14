    import {
    IsBoolean,
    } from "class-validator";

    export class FavoriteFileDto {
    @IsBoolean()
    favorite!: boolean;
    }