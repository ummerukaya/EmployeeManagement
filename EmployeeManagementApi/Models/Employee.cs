using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EmployeeManagement.Models
{
    public class Employee
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [StringLength(150)]
        public string FirstName { get; set; }

        [StringLength(150)]
        public string LastName { get; set; }

        [StringLength(250)]
        public string Email { get; set; }
        public int Age { get; set; }

        [StringLength(50)]
        public string Gender { get; set; }
        public DateTime Doj { get; set; }
        public int IsMarried { get; set; }
        public int IsActive { get; set; }
        public int DesignationId { get; set; }

        [NotMapped]
        public string Designation { get; set; }
    }
}
