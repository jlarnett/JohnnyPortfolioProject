﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using JohnnyPortfolioProject.Server.Data;
using JohnnyPortfolioProject.Server.Entities;

namespace JohnnyPortfolioProject.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactRequestsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ContactRequestsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/ContactRequests
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ContactRequest>>> GetContactRequests()
        {
            return await _context.ContactRequests.ToListAsync();
        }

        // GET: api/ContactRequests/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ContactRequest>> GetContactRequest(int id)
        {
            var contactRequest = await _context.ContactRequests.FindAsync(id);

            if (contactRequest == null)
            {
                return NotFound();
            }

            return contactRequest;
        }

        // PUT: api/ContactRequests/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutContactRequest(int id, ContactRequest contactRequest)
        {
            if (id != contactRequest.Id)
            {
                return BadRequest();
            }

            _context.Entry(contactRequest).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContactRequestExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ContactRequests
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ContactRequest>> PostContactRequest(ContactRequest contactRequest)
        {
            _context.ContactRequests.Add(contactRequest);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetContactRequest", new { id = contactRequest.Id }, contactRequest);
        }

        // DELETE: api/ContactRequests/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContactRequest(int id)
        {
            var contactRequest = await _context.ContactRequests.FindAsync(id);
            if (contactRequest == null)
            {
                return NotFound();
            }

            _context.ContactRequests.Remove(contactRequest);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ContactRequestExists(int id)
        {
            return _context.ContactRequests.Any(e => e.Id == id);
        }
    }
}
