using API.Core.Entities;
using API.Core.Interfaces;
using API.DTOs;
using API.Extensions;
using API.Helpers;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{

    public class CustomersController : BaseController
    {
        private readonly ICustomerService _customerService;
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;

        public CustomersController(ICustomerService customerService, UserManager<AppUser> userManager, IMapper mapper)
        {
            _customerService = customerService;
            _userManager = userManager;
            _mapper = mapper;
        }
        [HttpGet("GetCustomers")]
        public async Task<ActionResult<IReadOnlyList<CustomerDto>>> GetCustomer()
        {
            var user = await _userManager.FindByEmailFromClaimsPrinciple(HttpContext.User);
            return Ok(await _customerService.GetCustomersAsyc());
           // var returnResults = _mapper.Map<List<Customer>, List<CustomerDto>>((List<Customer>)customers);
            //return Ok(returnResults);
        }
        [HttpGet("GetCustomerWithPagination")]
        public async Task<ActionResult<IReadOnlyList<CustomerDto>>> GetCustomerWithPagination([FromQuery]CustomerParams customerParams)
        {
            var user = await _userManager.FindByEmailFromClaimsPrinciple(HttpContext.User);
            var results = await _customerService.GetPaginationCustomersAsyc(customerParams);
            Response.AddPaginationHeader(results.CurrentPage, results.PageSize, results.TotalCount, results.TotalPages);
            return Ok(results);
            // var returnResults = _mapper.Map<List<Customer>, List<CustomerDto>>((List<Customer>)customers);
            //return Ok(returnResults);
        }
        [HttpGet("GetCustomersByUserId/{id}")]
        public async Task<ActionResult<IReadOnlyList<CustomerDto>>> GetCustomerByUserId(string id)
        {
            var user = await _userManager.FindByEmailFromClaimsPrinciple(HttpContext.User);

            return Ok(await _customerService.GetCustomersByUserIdAsyc(id));
            //var returnResults = _mapper.Map<List<Customer>, List<CustomerDto>>((List<Customer>)customers);
           // return Ok(returnResults);
        }
        [HttpGet("GetCustomersById/{id}")]
        public async Task<ActionResult<CustomerDto>> GetCustomerById(int id)
        {
            var user = await _userManager.FindByEmailFromClaimsPrinciple(HttpContext.User);

           return Ok(await _customerService.GetCustomerByIdAsync(id));
        }
        [HttpPost("AddCustomer")]
        public async Task<ActionResult<CustomerDto>> PostAddCandidate(CustomerDto customer)
        {
            try
            {
                var user = await _userManager.FindByEmailFromClaimsPrinciple(HttpContext.User);
                var itemToMap = _mapper.Map<CustomerDto, Customer>(customer);
                itemToMap.AppUserId = user.Id;
                itemToMap.AppUser = user;
                var createdCustomer = await _customerService.AddCustomerAsync(itemToMap);
                var ReturnToMap = _mapper.Map<CustomerDto, Customer>(customer);
                return Ok(ReturnToMap);
            }
            catch (DbUpdateConcurrencyException)
            {

                return NotFound();
            }
        }
        [HttpPut("UpdateCustomer")]
        public async Task<ActionResult<CustomerDto>> UpdateCustomer(CustomerDto customer)
        {
            var user = await _userManager.FindByEmailFromClaimsPrinciple(HttpContext.User);
            var itemToMap = _mapper.Map<CustomerDto, Customer>(customer);
            var updateCustomer = await _customerService.UpdateCustomerAsync(itemToMap);

            return Ok(_mapper.Map<Customer, CustomerDto>(updateCustomer));
        }
        [HttpDelete("DeleteCustomer/{id}")]
        public async Task<ActionResult<CustomerDto>> DeleteCustomer(int id)
        {
            var user = await _userManager.FindByEmailFromClaimsPrinciple(HttpContext.User);

            //var customer = await _customerService.GetCustomerByIdAsync(id);
            //if (customer == null)
            //{
            //    return NotFound();
            //}
            var deletedCustomer = await _customerService.DeleteCustomerAsync(id);

            var mapResult = _mapper.Map<Customer, CustomerDto>(deletedCustomer);

            return mapResult;
        }
    }
}
