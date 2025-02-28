'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button'; // Shadcn UI Button
import { Input } from '@/components/ui/input'; // Shadcn UI Input
import { Textarea } from '@/components/ui/textarea'; // Shadcn UI Textarea
import { Label } from '@/components/ui/label'; // Shadcn UI Label
import { Loader2 } from 'lucide-react'; // Lucide React Icons
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'; // Shadcn UI Card
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // Shadcn UI Select

interface Params {
  id: string;
}

const EditCarPage = ({ params }: { params: Params }) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState<number | string>('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [contactInfo, setContactInfo] = useState('');
  const [status, setStatus] = useState<'available' | 'sold' | 'pending'>('available'); // Add status state
  const [loading, setLoading] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]); // For displaying existing images
  const router = useRouter();

  // Fetch car details for editing
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const res = await fetch(`/api/cars/${params.id}`);
        if (!res.ok) throw new Error('Failed to fetch car details');
        const data = await res.json();
        if (data.error) {
          alert(data.error);
          return;
        }

        // Pre-fill form fields with existing car data
        setTitle(data.title);
        setPrice(data.price);
        setDescription(data.description);
        setContactInfo(data.contactInfo);
        setStatus(data.status || 'available'); // Set the status
        setPreviewImages(data.images); // Store existing image URLs for preview
      } catch (error) {
        console.error(error);
        alert('Failed to fetch car details');
      }
    };

    fetchCarDetails();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate required fields
      if (!title || !price || !description || !contactInfo) {
        alert('All fields are required');
        setLoading(false);
        return;
      }

      // Upload new images to Cloudinary (if any)
      const imageUrls = images.length > 0
        ? await Promise.all(
            images.map(async (image) => {
              const formData = new FormData();
              formData.append('file', image);
              formData.append('upload_preset', 'car_sale');
              const res = await fetch('https://api.cloudinary.com/v1_1/dheovr1xv/upload', {
                method: 'POST',
                body: formData,
              });
              if (!res.ok) {
                const errorData = await res.json();
                throw new Error(`Failed to upload image: ${errorData.message}`);
              }
              const data = await res.json();
              return data.secure_url;
            })
          )
        : previewImages; // Use existing images if no new ones are uploaded

      // Prepare updated car data
      const updatedCar = {
        title,
        price: Number(price),
        description,
        images: imageUrls, // Array of image URLs
        contactInfo,
        status, // Include the status field
      };

      console.log('Update Payload:', updatedCar); // Log the payload for debugging

      // Send request to update the car
      const res = await fetch(`/api/cars/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCar),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to update car');
      }

      alert('Car updated successfully');
      router.push('/admin/all');
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        alert(error.message || 'An error occurred. Please try again.');
      } else {
        alert('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedImages = Array.from(e.target.files);
      setImages(selectedImages);

      // Generate previews for newly selected images
      const newPreviews = selectedImages.map((file) => URL.createObjectURL(file));
      setPreviewImages((prev) => [...prev, ...newPreviews]);
    }
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5 1.5-1.45 3-3.2 3-5.5 0-1.16-.5-2-1.5-3C8.5 7 7 8.16 7 9.5c0 2.3 1.5 4.05 3 5.5 1.5-1.45 3-3.2 3-5.5 0-1.16-.5-2-1.5-3C15.5 7 14 8.16 14 9.5c0 2.3 1.5 4.05 3 5.5z" />
          </svg>
          Edit Car
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <Label htmlFor="title">Car Title</Label>
            <Input
              id="title"
              type="text"
              placeholder="Enter car title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          {/* Price */}
          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              required
            />
          </div>
          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter car description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          {/* Status */}
          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={(value) => setStatus(value as 'available' | 'sold' | 'pending')}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Images */}
          <div>
            <Label htmlFor="images">Upload Images</Label>
            <Input
              id="images"
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-2"
            />
            {previewImages.length > 0 && (
              <div className="mt-2 flex gap-2">
                {previewImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Preview ${index}`}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                ))}
              </div>
            )}
          </div>
          {/* Contact Info */}
          <div>
            <Label htmlFor="contactInfo">Contact Information</Label>
            <Input
              id="contactInfo"
              type="text"
              placeholder="Enter contact info"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              required
            />
          </div>
          {/* Submit Button */}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating Car...
              </>
            ) : (
              'Update Car'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditCarPage;