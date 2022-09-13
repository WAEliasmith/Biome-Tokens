using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Tilemaps;
using System;

public class MapHandler : MonoBehaviour
{
  // [System.Serializable]
  // public class Decoration
  // {
  //   public GameObject prefab;
  //   public float chanceModifier;
  //   public float hueLow;
  //   public float hueHigh;
  //   public float greyLow;
  //   public float greyHigh;
  //   public bool dangerous = false;
  // }

  // public Decoration[] decorations = new Decoration[5];

  [System.Serializable]
  public class FloorTile
  {
    public Sprite texture;
    public float chanceModifier;
    public float hueLow;
    public float hueHigh;
    public float greyLow;
    public float greyHigh;
  }

  [System.Serializable]
  public class NFT
  {
    public float x;
    public float y;
    public float pollution;
  }

  public NFT[] NFTs = new NFT[5];

  public Sprite emptySprite = null;

  public FloorTile[] tiles = new FloorTile[5];

  public int seed = 0;

  public Tile floorTile;
  public Tilemap Floor;

  public GameObject player = null;

  public int gensize;

  public float smoothness = 10f;

  public float hue;

  public GameObject NFTprefab = null;

  public float saturation;
  public float rmod = 0.2f;
  public float bmod = 0.2f;
  public float gmod = 0.6f;
  public float rbase = 0.1f;
  public float bbase = 0.1f;
  public float gbase = 0.4f;

  public float pollutionRange = 10f;

  public bool start = false;

  public void SendToController(string message)
  {
    Debug.Log(message);

    //load nfts from message


    start = true;
    for (int k = 0; k < NFTs.Length; k++){
      NFT t = NFTs[k];
      GameObject p = Instantiate(NFTprefab, new Vector3(t.x,t.y,-0.5f), Quaternion.identity);
      p.GetComponent<NFTHandler>().pollution = t.pollution;
    }
  }

  // Start is called before the first frame update
  void Start()
  {
    //random seed
    seed = UnityEngine.Random.Range(0,1000000);

    gameObject.SendMessage("MapHandler", "start");
  }

  void DetectPlayerTile(){
    Debug.Log(Vector3Int.FloorToInt(player.transform.position));

    Color color = Floor.GetTile<Tile>(Vector3Int.FloorToInt(player.transform.position)).color;
    float H, S, V;
    Color.RGBToHSV(color, out H, out S, out V);
    hue = H;
    saturation = S;
  }

  void FixedUpdate()
  {
    //DetectPlayerTile();
    //place nearby tiles
    if(start == true){
      for (int i = -gensize; i <= gensize; i++){
        for (int j = -gensize; j <= gensize; j++){
          
          float r = Mathf.PerlinNoise(seed+1000+(player.transform.position.x+i)/smoothness,1000+(player.transform.position.y+j)/smoothness);
          float g = Mathf.PerlinNoise(seed-1000+(player.transform.position.x+i)/smoothness,-1000+(player.transform.position.y+j)/smoothness);
          float b = Mathf.PerlinNoise(seed+(player.transform.position.x+i)/smoothness,(player.transform.position.y+j)/smoothness);
          
          //modify saturation based on nearby NFTs
          float Smod = 0;
          for (int k = 0; k < NFTs.Length; k++){
            NFT t = NFTs[k];
            float dist = Vector3.Distance(player.transform.position + new Vector3(i, j, 0), new Vector3(t.x, t.y, 0));
            if(dist < pollutionRange){
              //pollution affects this tile based on dist
              Smod += ((pollutionRange-dist)/pollutionRange)*(0.5f-t.pollution);
            }
          }

          r = r*rmod+rbase;
          g = g*gmod+gbase;
          b = b*bmod+bbase;

          float Grayness = greyDetector(r,g,b);

          float H, S, V;
          Color.RGBToHSV(new Color(r,g,b), out H, out S, out V);
          //floorTile.color = new Color(r,g,b);

          S = 0.5f;

          S += Smod;

          if (S < 0){
            S = 0;
          }

          if(i == 0 && j == 0){
            hue = H;
            saturation = S;
            Debug.Log(Smod);
          }

          //choose floor sprite
          //spawn decorations at position based on hue and saturation
          floorTile.sprite = emptySprite;
          for (int k = 0; k < tiles.Length; k++){
            FloorTile f = tiles[k];

            //Make sure I am in the hue range
            if(f.hueLow < H && f.hueHigh >= H){
              //Make sure I am in the Saturation range
              if(f.greyLow < S && f.greyHigh >= S){
                if(UnityEngine.Random.Range(0,100) < f.chanceModifier){
                  floorTile.sprite = f.texture;
                  k = 999999;
                }
              }
            }
          }

          floorTile.color = Color.HSVToRGB(H,S,S);
          //floorTile.color = new Color(r,g,b);

          //floorTile.transform.rotation = (Quaternion.Euler(0, 0, rotateArray[UnityEngine.Random.Range(0,3)]));
          //floorTile.transform.SetTRS(new Vector3(0,0,0),(Quaternion.Euler(0, 0, rotateArray[UnityEngine.Random.Range(0,3)])), new Vector3(0,0,0));
          changeFloor(player.transform.position + new Vector3(i, j, 0), floorTile, true, H, S);
        }
      }
    }

    //remove far away tiles
    for (int i = -2*gensize; i <= 2*gensize; i++){
      if(i == -2*gensize || i == 2*gensize){
        for (int j = -2*gensize+1; j <= (2*gensize-1); j++){
          changeFloor(player.transform.position + new Vector3(i, j, 0), null);
        }
      }
      changeFloor(player.transform.position + new Vector3(i, -2*gensize, 0), null);
      changeFloor(player.transform.position + new Vector3(i, 2*gensize, 0), null);
    }
  }

  public void changeFloor(Vector3 position3d, Tile wallType = null, bool replace = false, float H = 0, float S = 0, bool white = false)
  {
    Vector3Int position = Vector3Int.FloorToInt(position3d);
    if(replace == false || Floor.GetTile(position) == null){
      Floor.SetTile(position, wallType);
      if(wallType != null){
        spawnDecorations(position, H, S);
      }
    }
  }

  public void spawnDecorations(Vector3Int position, float H, float S)
  {
    // //spawn decorations at position based on hue and saturation
    // for (int i = 0; i < decorations.Length; i++){
    //   Decoration d = decorations[i];

    //   //Make sure I am in the hue range
    //   if(d.hueLow < H && d.hueHigh >= H){
    //     //Make sure I am in the Saturation range
    //     if(d.greyLow < S && d.greyHigh >= S){
    //       if(UnityEngine.Random.Range(0,100) < 50){
    //         Instantiate(d.prefab, position, Quaternion.identity);
    //         i = 999999;
    //       }
    //     }
    //   }
    // }
  }

  public float greyDetector(float x, float y, float z){
    Vector3 direction = new Vector3(1,1,1);
    Vector3 startingPoint = new Vector3(0,0,0);
    Vector3 point = new Vector3(x,y,z);

    Ray ray = new Ray(startingPoint, direction);
    float distance = Vector3.Cross(ray.direction, point - ray.origin).magnitude;

    return distance;
  }
}
