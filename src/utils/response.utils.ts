import { ResponsePagination, ResponsePaginationUts, ResponseSuccess, ResponseUts } from 'src/interface';

class BaseResponse {
  _success(msg: string, data?: any): ResponseSuccess {
    return {
      status: 'Success',
      msg: msg,
      data: data || {},
    };
  }
  

  _pagination(msg:string, data:any,
    total:number,
    page:number,
    pageSize:number,
  ): ResponsePagination{
    return{
      status :"Success",
      msg : msg,
      data : data || {},
      pagination:{
        total : total,
        page : page,
        pageSize : pageSize,
        totalPage : Math.ceil(total/pageSize)
      }
    }
  }

  _sukses(message:string, data?:any):ResponseUts{
    return{
      status : "Success",
      message : message,
      data : data || []
    }
  }

  _paginationUts(
    message:string,data:any,total:number,page:number,pageSize:number
  ):ResponsePaginationUts{
    return{
      status : "Success",
      message : message, 
      data : data || [],
      pagination:{
        total_page : page == 0? page + 1 : page,
        page : page,
        total : total,
        nextPage : page + 1,
        pageSize : pageSize,
        previosPage : page - 1
      }
    }
  }
}

export default BaseResponse;