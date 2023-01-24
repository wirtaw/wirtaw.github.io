/*
Vladimir Poplavskij. Wykladowca
* -----------------
* Minimalna tablica monet, które tworzą daną wartość
* -----------------
2022-10-15
*/

#include <stdio.h>
#include <limits.h>
#include <stdlib.h>

struct Coins {
    int size;
    int list[INT_MAX];
};

struct Coins* minCoins(int coinList[], int n, int value);
void swap(int *xp, int *yp);
void selectionSort(int arr[], int n);

int main(void) {
   int coins[] = {3, 10, 5};
   int n = 3, value;
   do {
     printf("Wprowadzenie wartoci n. Musi byc > 0 \n");
     scanf("%d", &value);
   } while (value <= 0);
   struct Coins* result = minCoins(coins, n, value);
   if (result->size > 0) {
      printf("Minimum coins list required: \n");
      for (int i = 0; i < result->size; i++) {
        printf("%d \n", result->list[i]);
      }
   } else {
     printf("Niemozliwe podzielic wartosc \n");
   }
   return 0;
}

void swap(int *xp, int *yp) {
  int temp = *xp;
  *xp = *yp;
  *yp = temp;
}

void selectionSort(int arr[], int n) {
  int i, j, min_idx;

  for (i = 0; i < n - 1; i++) {
    min_idx = i;
    for (j = i + 1; j < n; j++)
      if (arr[j] < arr[min_idx])
        min_idx = j;

    if (min_idx != i)
      swap(&arr[min_idx], &arr[i]);
  }
}

struct Coins* minCoins(int coinList[], int n, int value) {
   struct Coins* result = (struct Coins*) malloc(sizeof(struct Coins));
   result->size = 0;

   if(value == 0)
      return result;

   int countListSorted[n];
   for (int i = 0; i < n; i++) {
      countListSorted[i] = coinList[i];
   }
   selectionSort(countListSorted, n);

   for (int i = n - 1; i >= 0; i--) {
      while (value >= countListSorted[i]) {
         result->list[result->size] = countListSorted[i];
         value = value - countListSorted[i];
         result->size++;
      }

      if (n == 0) {
        break;
      }
   }

   if (value > 0) {
       result->list[result->size] = value;
       result->size++;
   }
   return result;
}
