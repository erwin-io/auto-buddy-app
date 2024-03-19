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

  @Get("/model/car")
  @ApiQuery({ name: "make", required: true, type: String })
  //   @UseGuards(JwtAuthGuard)
  async getCarModel(
    @Query("make") make) {
    try {
      const response = await fetch(
        `https://apisearch.topgear.com.ph/topgear/v1/buyers-guide/search-vehicles/car?keywords=${make ? make : ''}&filterType=make_slug&match=wildcard`, {
        method: 'get',
        headers: { 
          'Content-Type': 'application/json' ,
          'Origin': 'https://www.topgear.com.ph' 
        },
      });
      const data = await response.json();
      let results = [];
      if(data && data.hits) {
        results = data.hits.hits.filter(x=>x._source.status === 1).map(x=> {
          return {
            id: x._source.id,
            vehicle_name: x._source.vehicle_name,
            make_name: x._source.make_name,
            make_logo: x._source.make_logo,
            make_slug: x._source.make_slug,
            model_name: x._source.model_name,
            model_slug: x._source.model_slug,
            year: x._source.year,
            date_published: x._source.date_published,
            image: x._source.image,
            description: x._source.description,
            price: x._source.price,
            category: x._source.category,
            transmission: x._source.transmission,
          }
        })
      }

      return {
        data: results,
        success: true,
      }
    } catch (e) {
      return {
        message: e,
        success: false,
      };
    }
  }

  @Get("/model/motorcycle")
  @ApiQuery({ name: "make", required: true, type: String })
  //   @UseGuards(JwtAuthGuard)
  async getMotorcycleModel(
    @Query("make") make) {
    try {
      const response = await fetch(
        `https://apisearch.topgear.com.ph/topgear/v1/buyers-guide/search-vehicles/motorcycle?keywords=${make ? make : ''}&filterType=make_slug&match=wildcard`, {
        method: 'get',
        headers: { 
          'Content-Type': 'application/json' ,
          'Origin': 'https://www.topgear.com.ph' 
        },
      });
      const data = await response.json();
      let results = [];
      if(data && data.hits) {
        results = data.hits.hits.filter(x=>x._source.status === 1).map(x=> {
          return {
            id: x._source.id,
            vehicle_name: x._source.vehicle_name,
            make_name: x._source.make_name,
            make_logo: x._source.make_logo,
            make_slug: x._source.make_slug,
            model_name: x._source.model_name,
            model_slug: x._source.model_slug,
            year: x._source.year,
            date_published: x._source.date_published,
            image: x._source.image,
            description: x._source.description,
            price: x._source.price,
            category: x._source.category,
            transmission: x._source.transmission,
          }
        })
      }

      return {
        data: results,
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
