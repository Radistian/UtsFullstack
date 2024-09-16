export interface ResponseSuccess{
    status:string,
    msg:string,
    data?:any
}

export interface ResponsePagination extends ResponseSuccess{
    pagination:{
        total:number,
        page:number,
        pageSize:number,
        totalPage:number
    }
}

export interface ResponseUts{
    status:string,
    message:string,
    data?:any
}

export interface ResponsePaginationUts extends ResponseUts{
    pagination:{
        total_page:number,
        page:number,
        total:number
        nextPage:number
        pageSize:number,
        previosPage:number
    }
}