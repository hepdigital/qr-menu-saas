import { RestaurantDetails } from '@/components/admin/restaurant-details'

export default function AdminRestaurantDetailsPage({
  params,
}: {
  params: { id: string }
}) {
  return <RestaurantDetails restaurantId={params.id} />
}
