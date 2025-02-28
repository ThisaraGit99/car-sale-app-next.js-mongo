"use client";

// In _app.tsx or globals.css
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FaEdit, FaTrash, FaPhone, FaMoneyBillWave, FaInfoCircle } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import { Button } from "@/components/ui/button"; // Shadcn UI Button
import Slider from "react-slick"; // Import react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; // Shadcn UI Card

interface CarProps {
  _id: string;
  title: string;
  price: number;
  description: string;
  images: string[]; // Array of image URLs
  contactInfo: string;
  status?: "available" | "sold" | "pending";
}

const CarCard = ({
  _id,
  title,
  price,
  description,
  images,
  contactInfo,
  status = "available",
}: CarProps) => {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  const statusColors = {
    available: "bg-green-100 text-green-800",
    sold: "bg-red-100 text-red-800",
    pending: "bg-yellow-100 text-yellow-800",
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/cars/${_id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete car");
      toast.success("Car deleted successfully!");
      router.refresh();
    } catch (error) {
      toast.error("Error deleting car.");
      console.error("Delete Error:", error);
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const handleEdit = () => router.push(`/admin/edit/${_id}`);

  // Slick Carousel Settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true,
  };

  return (
    <Card className="relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 group">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden rounded-t-xl">
        <Slider {...settings}>
          {images.length > 0 ? (
            images.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={`${title} - Image ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            ))
          ) : (
            <div>
              <img
                src="/car-placeholder.jpg"
                alt={title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          )}
        </Slider>
        <span
          className={`absolute top-2 right-2 px-3 py-1 text-sm font-medium rounded-full ${statusColors[status]}`}
        >
          {status.toUpperCase()}
        </span>
      </div>

      {/* Content Section */}
      <CardContent className="p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>
        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center">
            <FaMoneyBillWave className="text-blue-500 mr-2" />
            <span className="font-semibold">${price.toLocaleString()}</span>
          </div>
          <div className="flex items-center">
            <FaPhone className="text-green-500 mr-2" />
            <a
              href={`tel:${contactInfo}`}
              className="hover:text-green-600 transition-colors"
            >
              {contactInfo}
            </a>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex justify-between border-t pt-4">
          <Button
            onClick={handleEdit}
            variant="outline"
            className="flex items-center gap-2"
          >
            <FaEdit /> Edit
          </Button>
          <Button
            onClick={() => setIsDeleteModalOpen(true)}
            variant="destructive"
            className="flex items-center gap-2"
          >
            <FaTrash /> Delete
          </Button>
        </div>
      </CardContent>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        className="modal-content bg-white p-6 rounded-xl max-w-md mx-auto mt-20"
        overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
      >
        <div className="text-center">
          <FaInfoCircle className="text-red-500 text-4xl mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete this car listing? This action cannot be undone.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => setIsDeleteModalOpen(false)}
              variant="secondary"
            >
              Cancel
            </Button>
            <Button onClick={handleDelete} variant="destructive">
              Confirm Delete
            </Button>
          </div>
        </div>
      </Modal>
    </Card>
  );
};

export default CarCard;