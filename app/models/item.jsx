<Card title="Item Schema">
  <Field label="userId" type="ObjectId" note="Reference to User (required)" />
  <Field label="title" type="String" note="Required, Max: 150 characters" />
  <Field label="description" type="String" note="Optional" />
  <Field label="category" type="String" note="Enum: 'Men', 'Women', 'Kids', 'Unisex'" />
  <Field label="type" type="String" note="e.g., T-shirt, Jeans" />
  <Field label="size" type="String" note="e.g., S, M, L, XL" />
  <Field label="condition" type="String" note="Enum: 'New', 'Like New', 'Gently Used', 'Worn'" />
  <Field label="tags" type="[String]" note="Optional, used for filtering/search" />
  <Field label="imageUrls" type="[String]" note="Required, array of image links" />
  <Field label="status" type="String" note="Enum: 'pending', 'approved', 'swapped', 'rejected'; Default: 'pending'" />
  <Field label="createdAt" type="Date" note="Auto-generated" />
  <Field label="updatedAt" type="Date" note="Auto-updated" />
</Card>
