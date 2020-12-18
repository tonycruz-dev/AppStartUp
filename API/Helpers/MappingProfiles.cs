using API.Core.Entities;
using API.DTOs;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Customer, CustomerDto>().ReverseMap();
            CreateMap<Customer, CustomerWithJobItemDto>();
            CreateMap<Customer, CustomerWithInvoiceDto>();
            CreateMap<Invoice, InvoiceDto>().ReverseMap();
            CreateMap<JobItem, JobItemDto>().ReverseMap();
            CreateMap<Invoice, InvoiceInsertDto>().ReverseMap();
            CreateMap<InvoiceItem, InvoiceItemDto>();
            CreateMap<DateTime, DateTime>().ConvertUsing(d => DateTime.SpecifyKind(d, DateTimeKind.Utc));

        }
    }
}
