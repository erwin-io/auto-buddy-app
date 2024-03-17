
/* eslint-disable prettier/prettier */
import { Controller, Get } from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";

import { HttpService } from "@nestjs/axios";
import { catchError, firstValueFrom } from "rxjs";
import { HttpException, HttpStatus } from "@nestjs/common";
import fetch from 'node-fetch';
import { Query } from "@nestjs/common";

@ApiTags("api")
@Controller("api")
export class AppController {
  constructor(private readonly httpService: HttpService) {}

  @Get("/makes")
  @ApiQuery({ name: "type", required: false, type: String })
  //   @UseGuards(JwtAuthGuard)
  async getMakes(
    @Query("type") type) {
    try {
      const response = await fetch("https://apisearch.topgear.com.ph/topgear/v1/buyers-guide/makes/", {
        method: 'get',
        headers: { 
          'Content-Type': 'application/json' ,
          'Origin': 'https://www.topgear.com.ph' 
        },
      });

      const data = await response.json();

      if(type === "car" || type === "motorcycle") {
        return data.filter(x=>x.vehicle_type === type)
      } else {
        return data;
      }
    } catch (e) {
      return {
        message: e,
        success: false,
      };
    }
  }

  @Get("/model")
  @ApiQuery({ name: "make", required: true, type: String })
  @ApiQuery({ name: "model", required: false, type: String })
  //   @UseGuards(JwtAuthGuard)
  async getModel(
    @Query("make") make,
    @Query("make") model) {
    try {
      const response = await fetch(
        `https://apisearch.topgear.com.ph/topgear/v1/buyers-guide/search-vehicles/motorcycle?keywords=${make ? make : ''}&filterType=vehicle_name&match=wildcard`, {
        method: 'get',
        headers: { 
          'Content-Type': 'application/json' ,
          'Origin': 'https://www.topgear.com.ph' 
        },
      });

      return await response.json();
    } catch (e) {
      return {
        message: e,
        success: false,
      };
    }
  }
}
