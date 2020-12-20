using API.Core.Entities;
using API.Core.Interfaces;
using API.DTOs;
using API.Extensions;
using API.Helpers;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
   // [Authorize]
    public class CustomersController : BaseController
    {
        // private readonly ICustomerService _customerService;
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;

        public CustomersController(IUnitOfWork unitOfWork, UserManager<AppUser> userManager, IMapper mapper)
        {
            //_customerService = customerService;
            _unitOfWork = unitOfWork;
            _userManager = userManager;
            _mapper = mapper;
        }
        // Customers
        [HttpGet("GetCustomers")]
        public async Task<ActionResult<IReadOnlyList<CustomerDto>>> GetCustomer()
        {
            var user = await _userManager.FindByEmailFromClaimsPrinciple(HttpContext.User);
            return Ok(await _unitOfWork.CustomerService.GetCustomersAsyc());
           // var returnResults = _mapper.Map<List<Customer>, List<CustomerDto>>((List<Customer>)customers);
            //return Ok(returnResults);
        }
        [HttpGet("GetCustomerWithPagination")]
        public async Task<ActionResult<IReadOnlyList<CustomerDto>>> GetCustomerWithPagination([FromQuery]CustomerParams customerParams)
        {
            var user = await _userManager.FindByEmailFromClaimsPrinciple(HttpContext.User);
            var results = await _unitOfWork.CustomerService.GetPaginationCustomersAsyc(customerParams);
            Response.AddPaginationHeader(results.CurrentPage, results.PageSize, results.TotalCount, results.TotalPages);
            return Ok(results);
            // var returnResults = _mapper.Map<List<Customer>, List<CustomerDto>>((List<Customer>)customers);
            //return Ok(returnResults);
        }
        [HttpGet("GetCustomersByUserId/{id}")]
        public async Task<ActionResult<IReadOnlyList<CustomerDto>>> GetCustomerByUserId(string id)
        {
            var user = await _userManager.FindByEmailFromClaimsPrinciple(HttpContext.User);

            return Ok(await _unitOfWork.CustomerService.GetCustomersByUserIdAsyc(id));
            //var returnResults = _mapper.Map<List<Customer>, List<CustomerDto>>((List<Customer>)customers);
           // return Ok(returnResults);
        }
        [HttpGet("GetCustomersById/{id}")]
        public async Task<ActionResult<CustomerDto>> GetCustomerById(int id)
        {
            var user = await _userManager.FindByEmailFromClaimsPrinciple(HttpContext.User);

           return Ok(await _unitOfWork.CustomerService.GetCustomerByIdAsync(id));
        }
        [HttpPost("AddCustomer")]
        public async Task<ActionResult<CustomerDto>> PostAddCustomer(CustomerDto customer)
        {
            try
            {
                var user = await _userManager.FindByEmailFromClaimsPrinciple(HttpContext.User);
                var itemToMap = _mapper.Map<CustomerDto, Customer>(customer);
                itemToMap.AppUserId = user.Id;
                itemToMap.AppUser = user;
                var createdCustomer = await _unitOfWork.CustomerService.AddCustomerAsync(itemToMap);
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
            var updateCustomer = await _unitOfWork.CustomerService.UpdateCustomerAsync(itemToMap);

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
            var deletedCustomer = await _unitOfWork.CustomerService.DeleteCustomerAsync(id);

            var mapResult = _mapper.Map<Customer, CustomerDto>(deletedCustomer);

            return mapResult;
        }
        [HttpGet("GetJobItemByCustomerId/{id}")]
        public async Task<ActionResult<IReadOnlyList<JobItemDto>>> GetJobItem(int id)
        {
            var user = await _userManager.FindByEmailFromClaimsPrinciple(HttpContext.User);
            return Ok(await _unitOfWork.CustomerService.GetJobItemByCustomerIdAsync(id));
        }
        [HttpPost("AddJobItem")]
        public async Task<ActionResult<JobItemDto>> AddJobItem(JobItemDto jobItem)
        {
            try
            {
                var user = await _userManager.FindByEmailFromClaimsPrinciple(HttpContext.User);
                var itemToMap = _mapper.Map<JobItemDto, JobItem>(jobItem);

                var createdItem = await _unitOfWork.CustomerService.AddJobItemAsync(itemToMap);
                var ReturnToMap = _mapper.Map<JobItem, JobItemDto>(createdItem);
                return Ok(ReturnToMap);
            }
            catch (DbUpdateConcurrencyException)
            {

                return NotFound();
            }
        }
        [HttpPut("UpdateJobItem")]
        public async Task<ActionResult<CustomerDto>> UpdateJobItem(JobItemDto jobItem)
        {
            var user = await _userManager.FindByEmailFromClaimsPrinciple(HttpContext.User);
            var itemToMap = _mapper.Map<JobItemDto, JobItem>(jobItem);
            var updateJobItem = await _unitOfWork.CustomerService.UpdateJobItemAsync(itemToMap);

            return Ok(_mapper.Map<JobItem, JobItemDto>(updateJobItem));
        }
        [HttpDelete("DeleteJobItem/{id}")]
        public async Task<ActionResult<CustomerDto>> DeleteJobItem(int id)
        {
            var user = await _userManager.FindByEmailFromClaimsPrinciple(HttpContext.User);

            var deletedJobItem = await _unitOfWork.CustomerService.DeleteJobItemAsync(id);
            return Ok(_mapper.Map<JobItem, JobItemDto>(deletedJobItem));
        }
        [HttpPost("AddInvoice")]
        public async Task<ActionResult<InvoiceDto>> PostAddInvoice(InvoiceWithItemsDto invoice)
        {
            try
            {
                var user = await _userManager.FindByEmailFromClaimsPrinciple(HttpContext.User);
                var _invoice = new Invoice
                {
                     CustomerId = invoice.CustomerId,
                     InvoiceAddress =  invoice.InvoiceAddress,
                     InvoiceDate = DateTime.UtcNow,
                     InvoiceYesNo = invoice.InvoiceYesNo,
                     TotalValue = invoice.TotalValue,
                     TotalPaid = 0,
                     IsPosted = false,
                     InvoiceNote = "",
                     Title = "Invoice Genarated on " + DateTime.Now
                };
                var createdInvoice = await _unitOfWork.CustomerService.AddInvoiceAsync(_invoice);
                foreach (var item in invoice.InvoiceItems)
                {
                    var invoiceItem = new InvoiceItem
                    {
                        Amount = item.Amount,
                        InvoiceId = createdInvoice.Id,
                        ItemDescription = item.ItemDescription,
                        JobDate = DateTime.UtcNow,
                        IvoiceItemDate = DateTime.Now
                    };
                    var createdInvoiceItem = await _unitOfWork.CustomerService.AddInvoiceItemAsync(invoiceItem);

                }
                
                var ReturnToMap = _mapper.Map<Invoice, InvoiceDto>(createdInvoice);
                return Ok(ReturnToMap);
            }
            catch (DbUpdateConcurrencyException)
            {

                return NotFound();
            }
        }

        [HttpPut("UpdateInvoice")]
        public async Task<ActionResult<CustomerDto>> UpdateInvoice(InvoiceDto invoice)
        {
            //var user = await _userManager.FindByEmailFromClaimsPrinciple(HttpContext.User);
            var itemToMap = _mapper.Map<InvoiceDto, Invoice>(invoice);
            var updateInvoice = await _unitOfWork.CustomerService.UpdateInvoiceAsync(itemToMap);

            return Ok(_mapper.Map<Invoice, InvoiceDto>(updateInvoice));
        }
        [HttpDelete("DeleteInvoice/{id}")]
        public async Task<ActionResult<InvoiceDto>> DeleteInvoice(int id)
        {
            var user = await _userManager.FindByEmailFromClaimsPrinciple(HttpContext.User);

            var deletedInvoice = await _unitOfWork.CustomerService.DeleteInvoiceAsync(id);

            var mapResult = _mapper.Map<Invoice, InvoiceDto>(deletedInvoice);

            return mapResult;
        }
        [HttpGet("GetInvoiceByCustomerId/{id}")]
        public async Task<ActionResult<IReadOnlyList<InvoiceDto>>> GetInvoice(int id)
        {
            var user = await _userManager.FindByEmailFromClaimsPrinciple(HttpContext.User);
            return Ok(await _unitOfWork.CustomerService.GeInvoiceByCustomerIdAsync(id));
        }
        [HttpGet("GetInvoiceId/{id}")]
        public async Task<ActionResult<InvoiceItemDto>> GetInvoiceId(int id)
        {
            var user = await _userManager.FindByEmailFromClaimsPrinciple(HttpContext.User);

            return Ok(await _unitOfWork.CustomerService.GetInvoiceByIdAsync(id));
        }

    }
}
