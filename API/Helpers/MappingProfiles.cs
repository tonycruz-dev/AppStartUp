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
            CreateMap<Invoice, CustomerDto>().ReverseMap();

            //CreateMap<JobToRequest, JobToRequestToReturnDto>()
            //  .ForMember(d => d.TimeDetail, o => o.MapFrom(s => s.TimeDetail.Hour))
            //  .ForMember(d => d.ClientLocation, o => o.MapFrom(s => s.ClientLocation.Address1 + ' ' + s.ClientLocation.Address2))
            //  .ForMember(d => d.AttributeDetail, o => o.MapFrom(s => s.AttributeDetail.AttributeName))
            //  .ForMember(d => d.ShiftState, o => o.MapFrom(s => s.ShiftState.ShiftDetails))
            //  .ForMember(d => d.JobType, o => o.MapFrom(s => s.JobType.JobName))
            //  .ForMember(d => d.PaymentType, o => o.MapFrom(s => s.PaymentType.Name))
            //  .ForMember(d => d.Agency, o => o.MapFrom(s => s.Agency.Name))
            //  .ForMember(d => d.Grade, o => o.MapFrom(s => s.Grade.GradeName))
            //  .ForMember(d => d.Aria, o => o.MapFrom(s => s.Aria.Borough))
            //  .ForMember(d => d.AppUser, o => o.MapFrom(s => s.AppUser.NickName));
        }
    }
}
