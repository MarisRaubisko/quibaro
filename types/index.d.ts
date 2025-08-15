declare type User = {
  id: string;
  clerkId: string;
  email: string;
  photo: string;
  firstName?: string;
  lastName?: string;
  generations: number;
  posts: Post[];
};

declare type UserForPost = {
  photo: string;
  firstName?: string | null;
  lastName?: string | null;
};

declare type Post = {
  id: string;
  firstName?: string;
  lastName?: string;
  photo: string;
  public_id: string | null;
  prompt: string | null;
  generationType: string | null;
  shared: boolean;
  model: string | null;
  size: string | null;
  quality: string | null;
  style: string | null;
  authorId: string;
  author: UserForPost;
};

interface GenerationOptions {
  models: {
    value: string;
    label: string;
    price: number;
  }[];
  resolutions: {
    [key: string]: {
      value: string;
      label: string;
      price: number;
    }[];
  };
  qualities: {
    value: string;
    label: string;
    price: number;
  }[];
  styles: {
    value: string;
    label: string;
    price: number;
  }[];
}

interface StyleOption {
  value: string;
  label: string;
  price: number;
}

interface EditingOptions {
  style: StyleOption[];
}

type PostData = {
  firstName: string;
  lastName: string;
  photo: string;
  public_id?: string;
  prompt: string;
  model: "DALL-E-2" | "DALL-E-3";
  size: "256x256" | "512x512" | "1024x1024" | "1792x1024" | "1024x1792";
  generationType: string;
  authorId: string;
  quality?: "standard" | "hd";
  style?: "vivid" | "natural";
};

type EditPostData = {
  firstName: string;
  lastName: string;
  photo: string;
  public_id?: string;
  prompt: string;
  style: "3D" | "Emoji" | "Video game" | "Pixels" | "Clay" | "Toy";
  size: string;
  generationType: string;
  authorId: string;
};

type ImageGenerationOptions = {
  prompt: string;
  model: "dall-e-2" | "dall-e-3";
  size: "256x256" | "512x512" | "1024x1024" | "1792x1024" | "1024x1792";
  quality?: "standard" | "hd";
  style?: "vivid" | "natural";
};

interface CloudinaryUploadResponse {
  secure_url?: string;
  public_id?: string;
}

type MenuItemProps = {
  name?: string;
  icon: React.ReactNode;
  href: string;
  dropdownItems?: DropdownItemProps[];
  isActive?: boolean;
  hideForLoggedIn: boolean;
  hideForGuests: boolean;
};

type DropdownItemProps = {
  name: string;
  icon?: React.ReactNode;
  href: string;
};
