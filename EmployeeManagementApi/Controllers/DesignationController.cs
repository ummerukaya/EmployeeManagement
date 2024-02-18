using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EmployeeManagement.Models;

namespace EmployeeManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DesignationController : ControllerBase
    {
        private readonly EmployeeContext _context;

        public DesignationController(EmployeeContext context)
        {
            _context = context;
        }

        // GET: api/Designation
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Designation>>> GetDesignations()
        {
          if (_context.Designations == null)
          {
              return NotFound();
          }
            return await _context.Designations.ToListAsync();
        }

        // GET: api/Designation/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Designation>> GetDesignation(int id)
        {
          if (_context.Designations == null)
          {
              return NotFound();
          }
            var designation = await _context.Designations.FindAsync(id);

            if (designation == null)
            {
                return NotFound();
            }

            return designation;
        }

        // PUT: api/Designation/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDesignation(int id, Designation designation)
        {
            if (id != designation.Id)
            {
                return BadRequest();
            }

            _context.Entry(designation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DesignationExists(id))
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

        // POST: api/Designation
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Designation>> PostDesignation(Designation designation)
        {
          if (_context.Designations == null)
          {
              return Problem("Entity set 'EmployeeContext.Designations'  is null.");
          }
            _context.Designations.Add(designation);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDesignation", new { id = designation.Id }, designation);
        }

        // DELETE: api/Designation/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDesignation(int id)
        {
            if (_context.Designations == null)
            {
                return NotFound();
            }
            var designation = await _context.Designations.FindAsync(id);
            if (designation == null)
            {
                return NotFound();
            }

            _context.Designations.Remove(designation);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DesignationExists(int id)
        {
            return (_context.Designations?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
