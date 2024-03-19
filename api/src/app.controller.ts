/* eslint-disable @typescript-eslint/no-var-requires */

/* eslint-disable prettier/prettier */
import { Controller, Get, Res } from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";

import { HttpService } from "@nestjs/axios";
import { catchError, firstValueFrom } from "rxjs";
import { HttpException, HttpStatus } from "@nestjs/common";
import fetch from 'node-fetch';
import { Query } from "@nestjs/common";

import sharp from "sharp";
import axios from "axios";
const FormData = require('form-data');

@ApiTags("api")
@Controller("api")
export class AppController {
  constructor(private readonly httpService: HttpService) {}

  
  @Get("/getRemoveBackground")
  //   @UseGuards(JwtAuthGuard)
  @ApiQuery({ name: "url", required: true, type: String })
  async getRemoveBackground(@Query("url") url) {
    try {
      
      const imageResponse = await this.httpService.get(url, {
        responseType: "arraybuffer",
      }).toPromise();
      
      const img = await sharp(imageResponse.data).toFormat('png').toBuffer();
      
    
      const formData = new FormData();
      formData.append('file', img, 'image.png')

      const config = {
          headers: {
              'Origin': 'https://www.switchboard.ai',
              ...formData.getHeaders(),
          },
      };


      const result = await this.httpService.post('https://www.switchboard.ai/marketing/background', formData, {
        ...config,
        responseType: "arraybuffer",
      }).toPromise();
      const base64 = `data:image/png;base64,${Buffer.from(await sharp(result.data).toBuffer()).toString('base64')}`
      return base64;
    } catch (e) {
      return {
        message: e,
        success: false,
      };
    }
  }

  @Get("/makes/car")
  //   @UseGuards(JwtAuthGuard)
  async getAllCarMakes() {
    try {
      const response = await fetch("https://apisearch.topgear.com.ph/topgear/v1/buyers-guide/makes/", {
        method: 'get',
        headers: { 
          'Content-Type': 'application/json' ,
          'Origin': 'https://www.topgear.com.ph' 
        },
      });

      const data = await response.json();

      return {
        data: data.filter(x=>x.vehicle_type === "car" && !x.name.toLowerCase().includes("test")),
        success: true,
      }
    } catch (e) {
      return {
        message: e,
        success: false,
      };
    }
  }
  

  @Get("/makes/motorcycle")
  //   @UseGuards(JwtAuthGuard)
  async getAllMotorcycleMakes() {
    try {
      const response = await fetch("https://apisearch.topgear.com.ph/topgear/v1/buyers-guide/makes/", {
        method: 'get',
        headers: { 
          'Content-Type': 'application/json' ,
          'Origin': 'https://www.topgear.com.ph' 
        },
      });

      const data = await response.json();

      return {
        data: data.filter(x=>x.vehicle_type === "motorcycle"),
        success: true,
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

      return {
        data: response,
        success: true,
      }
    } catch (e) {
      return {
        message: e,
        success: false,
      };
    }
  }
}
