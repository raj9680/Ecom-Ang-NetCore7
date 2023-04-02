using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    // Setting Specifications for Products Table columns/Row
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            // Primary Key
            builder.Property(p => p.Id).IsRequired();

            builder.Property(p => p.Name).IsRequired().HasMaxLength(100);
            builder.Property(p => p.Description).IsRequired();
            builder.Property(p => p.Price).HasColumnType("decimal(18,2)");
            builder.Property(p => p.PictureUrl).IsRequired();

            // Foreign Keys
            builder.HasOne(b => b.ProductBrand).WithMany().HasForeignKey(p => p.ProductBrandId); // One to many relationship FK
            builder.HasOne(b => b.ProductType).WithMany().HasForeignKey(p => p.ProductTypeId); // One to many relationship FK
        }
    }
}