import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'about-who-is-section',
  standalone: true,
  imports: [TranslateModule, NgFor],
  templateUrl: './who-is-section.component.html',
  styleUrls: ['./who-is-section.component.scss'],
})
export class WhoIsSectionComponent {
  public carousel: Array<{
    active: boolean;
    images: Array<{
      image: string;
      label: string;
    }>;
  }> = [
    {
      active: true,
      images: [
        {
          image: '/assets/images/organizing/slides/slide-1.jpg',
          label: 'Closet Organizing',
        },
        {
          image: '/assets/images/organizing/slides/slide-2.jpg',
          label: 'Library and Books Organizing',
        },
        {
          image: '/assets/images/organizing/slides/slide-3.jpg',
          label: 'Papers and Office Organizing',
        },
        {
          image: '/assets/images/organizing/slides/slide-4.jpg',
          label: 'Crafts and Hobbies Organizing',
        },
      ],
    },
    {
      active: false,
      images: [
        {
          image: '/assets/images/organizing/slides/slide-5.jpg',
          label: 'Living + Family Room Organizing',
        },
        {
          image: '/assets/images/organizing/slides/slide-6.jpg',
          label: 'Kitchen and Pantry Organizing',
        },
        {
          image: '/assets/images/organizing/slides/slide-7.jpg',
          label: 'Bedroom Organizing',
        },
        {
          image: '/assets/images/organizing/slides/slide-8.jpg',
          label: 'Bath and Laundry Organizing',
        },
      ],
    },
    {
      active: false,
      images: [
        {
          image: '/assets/images/organizing/slides/slide-9.jpg',
          label: 'Tech and Electronics Organizing',
        },
        {
          image: '/assets/images/organizing/slides/slide-10.jpg',
          label: 'Tools and Garage Organizing',
        },
        {
          image: '/assets/images/organizing/slides/slide-11.jpg',
          label: 'Workout Gear Organizing',
        },
        {
          image: '/assets/images/organizing/slides/slide-12.jpg',
          label: 'Children and Toys Organizing',
        },
      ],
    },
    {
      active: false,
      images: [
        {
          image: '/assets/images/organizing/slides/slide-13.jpg',
          label: 'Pets and Animals Organizing',
        },
        {
          image: '/assets/images/organizing/slides/slide-14.jpg',
          label: 'Digital Devices Organizing',
        },
        {
          image: '/assets/images/organizing/slides/slide-15.jpg',
          label: 'Sentimental Organizing',
        },
        {
          image: '/assets/images/organizing/slides/slide-1.jpg',
          label: 'Closet Organizing',
        },
      ],
    },
  ];
}
