﻿// <auto-generated />
using System;
using Karusc.Server.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Karusc.Server.Infrastructure.Migrations
{
    [DbContext(typeof(KaruscDbContext))]
    partial class KaruscDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.14")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("CategoryProduct", b =>
                {
                    b.Property<Guid>("CategoriesId")
                        .HasColumnType("char(36)");

                    b.Property<Guid>("ProductsId")
                        .HasColumnType("char(36)");

                    b.HasKey("CategoriesId", "ProductsId");

                    b.HasIndex("ProductsId");

                    b.ToTable("CategoryProduct");
                });

            modelBuilder.Entity("CollectionProduct", b =>
                {
                    b.Property<Guid>("CollectionsId")
                        .HasColumnType("char(36)");

                    b.Property<Guid>("ProductsId")
                        .HasColumnType("char(36)");

                    b.HasKey("CollectionsId", "ProductsId");

                    b.HasIndex("ProductsId");

                    b.ToTable("CollectionProduct");
                });

            modelBuilder.Entity("Karusc.Server.Domain.Files.File<Karusc.Server.Domain.Products.Product>", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<Guid>("EntityId")
                        .HasColumnType("char(36)");

                    b.Property<string>("FileName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("EntityId");

                    b.ToTable("ProductImages");
                });

            modelBuilder.Entity("Karusc.Server.Domain.Products.Category", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<string>("ImageURL")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.HasKey("Id");

                    b.HasIndex("Name");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("Karusc.Server.Domain.Products.Collection", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<string>("ImageURL")
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.HasKey("Id");

                    b.HasIndex("Name");

                    b.ToTable("Collections");
                });

            modelBuilder.Entity("Karusc.Server.Domain.Products.Product", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<string>("CareInstructions")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<decimal>("Price")
                        .HasPrecision(7, 2)
                        .HasColumnType("decimal(7,2)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("Karusc.Server.Domain.Reviews.Review", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<Guid?>("AuthorId")
                        .IsRequired()
                        .HasColumnType("char(36)");

                    b.Property<int>("Rating")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("AuthorId");

                    b.ToTable("Reviews");
                });

            modelBuilder.Entity("Karusc.Server.Domain.UI.HomeCarouselImage", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<string>("ImageURL")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.HasKey("Id");

                    b.HasIndex("ImageURL");

                    b.ToTable("HomeCarouselImages");
                });

            modelBuilder.Entity("Karusc.Server.Domain.Users.Address", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Country")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Line1")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Line2")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Pincode")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Recipient")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("State")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<Guid?>("UserId")
                        .IsRequired()
                        .HasColumnType("char(36)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Addresses");
                });

            modelBuilder.Entity("Karusc.Server.Domain.Users.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("ProfilePictureURL")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("Role")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.ToTable("Users");
                });

            modelBuilder.Entity("CategoryProduct", b =>
                {
                    b.HasOne("Karusc.Server.Domain.Products.Category", null)
                        .WithMany()
                        .HasForeignKey("CategoriesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Karusc.Server.Domain.Products.Product", null)
                        .WithMany()
                        .HasForeignKey("ProductsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("CollectionProduct", b =>
                {
                    b.HasOne("Karusc.Server.Domain.Products.Collection", null)
                        .WithMany()
                        .HasForeignKey("CollectionsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Karusc.Server.Domain.Products.Product", null)
                        .WithMany()
                        .HasForeignKey("ProductsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Karusc.Server.Domain.Files.File<Karusc.Server.Domain.Products.Product>", b =>
                {
                    b.HasOne("Karusc.Server.Domain.Products.Product", "Entity")
                        .WithMany("Images")
                        .HasForeignKey("EntityId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Entity");
                });

            modelBuilder.Entity("Karusc.Server.Domain.Reviews.Review", b =>
                {
                    b.HasOne("Karusc.Server.Domain.Users.User", "Author")
                        .WithMany("Reviews")
                        .HasForeignKey("AuthorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Author");
                });

            modelBuilder.Entity("Karusc.Server.Domain.Users.Address", b =>
                {
                    b.HasOne("Karusc.Server.Domain.Users.User", "User")
                        .WithMany("Addresses")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Karusc.Server.Domain.Products.Product", b =>
                {
                    b.Navigation("Images");
                });

            modelBuilder.Entity("Karusc.Server.Domain.Users.User", b =>
                {
                    b.Navigation("Addresses");

                    b.Navigation("Reviews");
                });
#pragma warning restore 612, 618
        }
    }
}
