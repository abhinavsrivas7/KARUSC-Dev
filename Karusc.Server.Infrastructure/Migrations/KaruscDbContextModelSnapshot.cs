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

            modelBuilder.Entity("Karusc.Server.Domain.File.File<Karusc.Server.Domain.Product.Product>", b =>
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

            modelBuilder.Entity("Karusc.Server.Domain.Product.Category", b =>
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

            modelBuilder.Entity("Karusc.Server.Domain.Product.Collection", b =>
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

            modelBuilder.Entity("Karusc.Server.Domain.Product.Product", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

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

            modelBuilder.Entity("Karusc.Server.Domain.User.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("ProfilePictureURL")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("Role")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("Email");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("CategoryProduct", b =>
                {
                    b.HasOne("Karusc.Server.Domain.Product.Category", null)
                        .WithMany()
                        .HasForeignKey("CategoriesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Karusc.Server.Domain.Product.Product", null)
                        .WithMany()
                        .HasForeignKey("ProductsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("CollectionProduct", b =>
                {
                    b.HasOne("Karusc.Server.Domain.Product.Collection", null)
                        .WithMany()
                        .HasForeignKey("CollectionsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Karusc.Server.Domain.Product.Product", null)
                        .WithMany()
                        .HasForeignKey("ProductsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Karusc.Server.Domain.File.File<Karusc.Server.Domain.Product.Product>", b =>
                {
                    b.HasOne("Karusc.Server.Domain.Product.Product", "Entity")
                        .WithMany("Images")
                        .HasForeignKey("EntityId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Entity");
                });

            modelBuilder.Entity("Karusc.Server.Domain.Product.Product", b =>
                {
                    b.Navigation("Images");
                });
#pragma warning restore 612, 618
        }
    }
}
