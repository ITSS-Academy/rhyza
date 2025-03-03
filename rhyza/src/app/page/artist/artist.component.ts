import { Component } from '@angular/core';
import {ArtistsComponent} from '../../shared/components/artists/artists.component';

@Component({
  selector: 'app-artist',
  standalone: true,
  imports: [
    ArtistsComponent
  ],
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.scss'
})
export class ArtistComponent {
  constructor() {
  }
  cardarttists=[
    {
      imageArtists: "https://kenh14cdn.com/203336854389633024/2024/10/2/image2-1630-1727833092698-17278330935461724047371.jpg",
      textTopArtists: "HIEUTHUHAI",
      textMidArtists: "Update today",
    },
    {
      imageArtists: "https://yt3.googleusercontent.com/c-Z7mIlntSpG6VyQ5ZqaPggqkZRhaySr-H5ZEazFN2iR1pP4eD1UGekwu0y--c4CSVhJJ1A4QT8=s900-c-k-c0x00ffffff-no-rj",
      textTopArtists: "Sơn Tùng MTP",
      textMidArtists: "Update 1 day ago",
    },
    {
      imageArtists: "https://thanhnien.mediacdn.vn/Uploaded/caotung/2022_08_07/ca-si-mono-2225.jpg",
      textTopArtists: "MONO",
      textMidArtists: "Update 2 days ago",
    },
    {
      imageArtists: "https://thanhnien.mediacdn.vn/Uploaded/haoph/2022_06_07/phan-manh-quynh-5-4064.jpeg",
      textTopArtists: "Phan Mạnh Quỳnh",
      textMidArtists: "Update 3 days ago",
    },
    {
      imageArtists: "https://images2.thanhnien.vn/zoom/686_429/528068263637045248/2023/6/5/edit-den-453-16859631579211756268460-97-0-966-1390-crop-16859631696641378413218.png",
      textTopArtists: "Đen Vâu",
      textMidArtists: "Update 5 days ago",
    },    {
      imageArtists: "https://giadinh.mediacdn.vn/296230595582509056/2023/9/12/hoangthuylinh-1-1100-1694478749056-1694478751658633929399.jpg",
      textTopArtists: "Hoàng Thùy Linh",
      textMidArtists: "Update 6 days ago",
    },
    {
      imageArtists: "https://bizweb.dktcdn.net/100/411/628/products/booklet-2-1.jpg?v=1696072190907",
      textTopArtists: "MCK",
      textMidArtists: "Update 1 week ago",
    },
    {
      imageArtists: "https://i1.sndcdn.com/artworks-gJsfPymL3wr6z9Nu-hgVzUw-t240x240.jpg",
      textTopArtists: "Wrxdie",
      textMidArtists: "Update 2 weeks ago",
    },
    {
      imageArtists: "https://yt3.googleusercontent.com/65ilJtAVRHVimPdL91UBJwoM7mR8kBYxon0AH71HKhHeAcS-KuF9PV6TreYp6dOkea5p24yA=s900-c-k-c0x00ffffff-no-rj",
      textTopArtists: "Wren Evans",
      textMidArtists: "Update 3 weeks ago",
    },
    {
      imageArtists: "data:image/jpeg;base64,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",
      textTopArtists: "GreyD",
      textMidArtists: "Update 1 month ago",
    },
    {
      imageArtists: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0cOLbWDJqbQlMc1mmy0Yyd01uYQO21m4iwg&s",
      textTopArtists: "Obito",
      textMidArtists: "Update 2 months ago",
    },
    {
      imageArtists: "https://yt3.googleusercontent.com/Scnb6zniVBsy8eT2v01XP8xUN_DhlSuDie_ohDbfkpUkPhkl4DzP6PYzrnqPhnJ7HsktuYTjP1Y=s900-c-k-c0x00ffffff-no-rj",
      textTopArtists: "Dương Domic",
      textMidArtists: "Update 3 months ago",
    },
    {
      imageArtists: "https://vcdn1-giaitri.vnecdn.net/2023/03/06/Tlinh-3403-1678086389.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=3fIeK8sqWNNzXWC0QHvd3Q",
      textTopArtists: "Tlinh",
      textMidArtists: "Update 1 year ago",
    },
    {
      imageArtists: "https://i.scdn.co/image/ab6761610000e5eb655c4a2a98366c2a276f6e9b",
      textTopArtists: "LowG",
      textMidArtists: "Update  1 year ago",
    },
    {
      imageArtists: "https://vcdn1-giaitri.vnecdn.net/2023/05/11/BRAY-232-jpeg-3783-1683791747.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=bdz9_j11pcbi5qmghjuAoA",
      textTopArtists: "Bray",
      textMidArtists: "Update 2 years ago",
    },
    {
      imageArtists: "https://photo-zmp3.zadn.vn/avatars/3/a/3/b/3a3b2b9a10739b28cb475303d9d06543.jpg",
      textTopArtists: "Anh Phan",
      textMidArtists: "Update 3 years ago",
    },
    {
      imageArtists: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7ExUUl1epNDFu88FfFq1gUYjTTjcpfndZfQ&s",
      textTopArtists: "Wean",
      textMidArtists: "Update 4 years ago",
    },
    {
      imageArtists: "https://nld.mediacdn.vn/2020/11/10/dsc3023-1604970578674399007184.jpg",
      textTopArtists: "BinZ",
      textMidArtists: "Update today",
    },
    {
      imageArtists: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtdx9nhoj4zsD-FdJmoqZjke-4EmH5zEqAcw&s",
      textTopArtists: "Soobin Hoàng Sơn",
      textMidArtists: "Update 1 day ago",
    },
    {
      imageArtists: "https://thanhnien.mediacdn.vn/Uploaded/hienth/2022_08_01/tao-6269-edit-1-1766.jpg",
      textTopArtists: "OnlyC",
      textMidArtists: "Update yesterday",
    },
    {
      imageArtists: "https://golives3.s3.amazonaws.com/2022/11/22898_ebcd2eb8de24112af5160ee8500dfe92.png",
      textTopArtists: "Karik",
      textMidArtists: "Update 2 days ago",
    },
    {
      imageArtists: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKZOf5z_MpX9T1bNZSnIDx51mnnhUeIm79yg&s",
      textTopArtists: "Quang Hùng MasterD",
      textMidArtists: "Update 1 day ago",
    },
    {
      imageArtists: "https://vcdn1-giaitri.vnecdn.net/2022/09/25/-8643-1664069792.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=bxvSeYSplsy_sUg7fEx6Mg",
      textTopArtists: "Đức Phúc",
      textMidArtists: "Update 3 days ago",
    },
    {
      imageArtists: "https://i.scdn.co/image/ab6761610000e5ebec6827805882ed3407b8cffd",
      textTopArtists: "Erik",
      textMidArtists: "Update 1 day ago",
    },
    {
      imageArtists: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSySTokSYBbs9yK6GJWm1jUoJy1L9TbvNfyaA&s",
      textTopArtists: "Hòa Minzy",
      textMidArtists: "Update 1 day ago",
    },
    {
      imageArtists: "https://kenh14cdn.com/203336854389633024/2025/3/1/laem-chipu1018-1740752460943-1740752462313497151202-1740788601000-17407886014621875716018.jpg",
      textTopArtists: "Chi Pu",
      textMidArtists: "Update 1 day ago",
    },
    {
      imageArtists: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO7NLf4MSa0i9iKwSgsvSYDpFaMbDZo0PNKw&s",
      textTopArtists: "Amee",
      textMidArtists: "Update 1 day ago",
    },
    {
      imageArtists: "https://iv1cdn.vnecdn.net/giaitri/images/web/2022/03/02/trich-mv-tren-tinh-ban-duoi-tinh-yeu-cua-min-1646217101.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=J0gbE6MZhhYCVgAfFGb2IQ",
      textTopArtists: "M.I.N",
      textMidArtists: "Update 1 day ago",
    },
    {
      imageArtists: "https://photo-zmp3.zadn.vn/avatars/a/6/5/f/a65f857434a939ba08f1662903b5d7af.jpg",
      textTopArtists: "VSTRA",
      textMidArtists: "Update 1 day ago",
    },
    {
      imageArtists: "https://media-cdn-v2.laodong.vn/storage/newsportal/2021/11/26/977990/254291766_4331321781.jpg",
      textTopArtists: "Vũ.",
      textMidArtists: "Update 1 day ago",
    },
    {
      imageArtists: "https://i.scdn.co/image/ab6761610000e5eb66e0a040a53996e8bf19f9b5",
      textTopArtists: "Ngọt",
      textMidArtists: "Update 1 day ago",
    },
    {
      imageArtists: "https://i.scdn.co/image/ab6761610000e5eb2e1835960ece8454ec87ef6a",
      textTopArtists: "Cá Hồi Hoang",
      textMidArtists: "Update 1 day ago",
    },
    {
      imageArtists: "https://yt3.googleusercontent.com/enG03m1WKMfZL8ym-8fbtPPDA2uGOX3t1NIWVxltWdJHTmYKsT7LeWYbtrNI7c-PZlB2IqyaqA=s900-c-k-c0x00ffffff-no-rj",
      textTopArtists: "Hà Anh Tuấn",
      textMidArtists: "Update 1 day ago",
    },
    {
      imageArtists: "https://danviet.mediacdn.vn/296231569849192448/2022/3/25/avadatg16200239721251859034862-16482233624431367779551.jpg",
      textTopArtists: "ĐạtG",
      textMidArtists: "Update 1 day ago",
    },
    {
      imageArtists: "https://yt3.googleusercontent.com/5ziX6oBP7mrRoyxq_DBDWfTVHh-TxdTrQwoyfVicfPKf38UURVMgeDcm0GDt-0NoRii2I6lnIQ=s900-c-k-c0x00ffffff-no-rj",
      textTopArtists: "Anhdrea Right Hand",
      textMidArtists: "Update 1 day ago",
    },
  ]

}
